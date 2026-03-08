import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import ValidationPopup, { type ValidationType } from "@/components/ValidationPopup";
import ConfirmPopup from "@/components/ConfirmPopup";

type PopupState = {
  key: string;
  type: ValidationType;
  message: string;
};

type ConfirmState = {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  tone: "warning" | "danger";
};

function inferConfirmTone(input: { title?: string; message: string; confirmLabel?: string; explicitTone?: string | null }) {
  const explicit = (input.explicitTone ?? "").toLowerCase();
  if (explicit === "danger" || explicit === "warning") {
    return explicit as "warning" | "danger";
  }

  const source = `${input.title ?? ""} ${input.message} ${input.confirmLabel ?? ""}`.toLowerCase();
  if (/(hapus|delete|logout|keluar|remove)/.test(source)) {
    return "danger";
  }

  return "warning";
}

function pickString(value: unknown): string | null {
  if (typeof value === "string") {
    const text = value.replace(/\+/g, " ").trim();
    return text.length > 0 ? text : null;
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      if (typeof item === "string") {
        const text = item.replace(/\+/g, " ").trim();
        if (text.length > 0) return text;
      }
    }
  }
  return null;
}

function resolvePopupFromProps(pageProps: Record<string, unknown>, query: Record<string, unknown>): { type: ValidationType; message: string } | null {
  const checks: Array<{ type: ValidationType; keys: string[] }> = [
    { type: "error", keys: ["error", "errors", "fail", "failed"] },
    { type: "warning", keys: ["warning", "warn"] },
    { type: "success", keys: ["success", "ok"] },
    { type: "info", keys: ["info"] },
  ];

  for (const check of checks) {
    for (const key of check.keys) {
      const fromQuery = pickString(query[key]);
      if (fromQuery) return { type: check.type, message: fromQuery };

      const fromProps = pickString(pageProps[key]);
      if (fromProps) return { type: check.type, message: fromProps };
    }
  }

  const message = pickString(query.message) ?? pickString(pageProps.message) ?? pickString(query.msg) ?? pickString(pageProps.msg);
  if (!message) return null;

  const typeCandidate = pickString(query.type) ?? pickString(pageProps.type) ?? pickString(query.status) ?? pickString(pageProps.status);
  const type = (typeCandidate?.toLowerCase() ?? "info") as ValidationType;

  if (type === "success" || type === "error" || type === "warning" || type === "info") {
    return { type, message };
  }

  return { type: "info", message };
}

function collectHeaderLabels(table: HTMLTableElement) {
  const labels: string[] = [];
  const headerRows = table.tHead ? Array.from(table.tHead.rows) : [];

  if (headerRows.length > 0) {
    const leaf = headerRows[headerRows.length - 1];
    for (const cell of Array.from(leaf.cells)) {
      const text = cell.textContent?.replace(/\s+/g, " ").trim() ?? "";
      labels.push(text.length > 0 ? text : `Kolom ${labels.length + 1}`);
    }
    return labels;
  }

  const firstRow = table.querySelector("tr");
  if (!firstRow) return labels;

  for (const cell of Array.from(firstRow.cells)) {
    const text = cell.textContent?.replace(/\s+/g, " ").trim() ?? "";
    labels.push(text.length > 0 ? text : `Kolom ${labels.length + 1}`);
  }

  return labels;
}

function enhanceResponsiveTables() {
  const tables = Array.from(document.querySelectorAll<HTMLTableElement>("table.responsive-table"));

  for (const table of tables) {
    const labels = collectHeaderLabels(table);
    const rowSelectors = ["tbody tr", "tfoot tr"];
    const rows = rowSelectors.flatMap((selector) => Array.from(table.querySelectorAll<HTMLTableRowElement>(selector)));

    for (const row of rows) {
      let pointer = 0;
      const cells = Array.from(row.cells);
      for (const cell of cells) {
        const span = Number(cell.getAttribute("colspan") ?? cell.getAttribute("colSpan") ?? "1") || 1;
        if (!cell.hasAttribute("colspan") && !cell.hasAttribute("colSpan")) {
          const nextLabel = labels[pointer] ?? `Kolom ${pointer + 1}`;
          const current = cell.getAttribute("data-label");
          if (!current || current.trim().length === 0) {
            cell.setAttribute("data-label", nextLabel);
          }
        }
        pointer += Math.max(1, span);
      }
    }

    const scroller = table.closest(".overflow-x-auto");
    if (scroller) {
      scroller.classList.add("responsive-table-shell");
    }
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [popup, setPopup] = useState<PopupState | null>(null);
  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null);
  const pendingConfirmAction = useRef<(() => void) | null>(null);

  const resolved = useMemo(() => {
    const value = resolvePopupFromProps(pageProps as Record<string, unknown>, router.query as Record<string, unknown>);
    if (!value) return null;
    return {
      key: `${router.asPath}::${value.type}::${value.message}`,
      ...value,
    };
  }, [pageProps, router.asPath, router.query]);

  useEffect(() => {
    if (!resolved) return;
    setPopup((current) => {
      if (current?.key === resolved.key) return current;
      return resolved;
    });
  }, [resolved]);

  const closeConfirm = useCallback(() => {
    pendingConfirmAction.current = null;
    setConfirmState(null);
  }, []);

  const openConfirm = useCallback(
    (
      message: string,
      action: () => void,
      options?: {
        title?: string;
        confirmLabel?: string;
        cancelLabel?: string;
        tone?: "warning" | "danger";
      },
    ) => {
      pendingConfirmAction.current = action;
      setConfirmState({
        title: options?.title ?? "Konfirmasi",
        message,
        confirmLabel: options?.confirmLabel ?? "Lanjutkan",
        cancelLabel: options?.cancelLabel ?? "Batal",
        tone: options?.tone ?? inferConfirmTone({ title: options?.title, message, confirmLabel: options?.confirmLabel }),
      });
    },
    [],
  );

  const runConfirm = useCallback(() => {
    const action = pendingConfirmAction.current;
    pendingConfirmAction.current = null;
    setConfirmState(null);
    action?.();
  }, []);

  useEffect(() => {
    const toClientHref = (href: string) => {
      const parsed = new URL(href, window.location.href);
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    };

    const canUseClientNavigation = (anchor: HTMLAnchorElement) => {
      const target = anchor.getAttribute("target");
      if (target && target !== "_self") return false;
      if (anchor.hasAttribute("download")) return false;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return false;
      if (rawHref.startsWith("#")) return false;
      if (rawHref.startsWith("mailto:") || rawHref.startsWith("tel:") || rawHref.startsWith("javascript:")) return false;

      const rel = (anchor.getAttribute("rel") ?? "").toLowerCase();
      if (rel.includes("external")) return false;

      const parsed = new URL(anchor.href, window.location.href);
      if (parsed.origin !== window.location.origin) return false;
      if (parsed.pathname === window.location.pathname && parsed.search === window.location.search && parsed.hash) return false;
      return true;
    };

    const readConfirmOptions = (element: Element) => {
      const title = pickString(element.getAttribute("data-confirm-title"));
      const confirmLabel = pickString(element.getAttribute("data-confirm-confirm-label"));
      const cancelLabel = pickString(element.getAttribute("data-confirm-cancel-label"));
      const explicitTone = pickString(element.getAttribute("data-confirm-tone"));
      const tone = inferConfirmTone({
        title: title ?? undefined,
        message: pickString(element.getAttribute("data-confirm")) ?? "",
        confirmLabel: confirmLabel ?? undefined,
        explicitTone,
      });
      return { title: title ?? undefined, confirmLabel: confirmLabel ?? undefined, cancelLabel: cancelLabel ?? undefined, tone };
    };

    const onSubmit = (event: Event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;

      const message = pickString(form.getAttribute("data-confirm"));
      if (!message) return;

      if (form.dataset.confirmed === "1") {
        form.dataset.confirmed = "0";
        return;
      }

      event.preventDefault();
      const submitEvent = event as SubmitEvent;
      const submitter = submitEvent.submitter instanceof HTMLElement ? submitEvent.submitter : null;
      const options = readConfirmOptions(form);

      openConfirm(message, () => {
        form.dataset.confirmed = "1";
        if (typeof form.requestSubmit === "function") {
          if (submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement) {
            form.requestSubmit(submitter);
            return;
          }
          form.requestSubmit();
          return;
        }
        form.submit();
      }, options);
    };

    const onLinkClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[data-confirm]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const message = pickString(anchor.getAttribute("data-confirm"));
      if (!message) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      event.preventDefault();
      const options = readConfirmOptions(anchor);
      openConfirm(message, () => {
        if (canUseClientNavigation(anchor)) {
          void router.push(toClientHref(anchor.href));
          return;
        }
        window.location.assign(anchor.href);
      }, options);
    };

    const onInternalAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.hasAttribute("data-confirm")) return;
      if (!canUseClientNavigation(anchor)) return;

      event.preventDefault();
      void router.push(toClientHref(anchor.href));
    };

    document.addEventListener("submit", onSubmit, true);
    document.addEventListener("click", onLinkClick, true);
    document.addEventListener("click", onInternalAnchorClick, true);
    return () => {
      document.removeEventListener("submit", onSubmit, true);
      document.removeEventListener("click", onLinkClick, true);
      document.removeEventListener("click", onInternalAnchorClick, true);
    };
  }, [openConfirm, router]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafA = 0;
    let rafB = 0;
    let timer = 0;
    const run = () => enhanceResponsiveTables();

    run();
    rafA = window.requestAnimationFrame(() => {
      run();
      rafB = window.requestAnimationFrame(run);
    });
    timer = window.setTimeout(run, 220);

    const onResize = () => run();
    window.addEventListener("resize", onResize);

    const observer = new MutationObserver((mutations) => {
      const hasTableInsert = mutations.some((mutation) =>
        Array.from(mutation.addedNodes).some((node) => {
          if (!(node instanceof HTMLElement)) return false;
          return node.matches("table.responsive-table") || Boolean(node.querySelector("table.responsive-table"));
        }),
      );
      if (hasTableInsert) run();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.cancelAnimationFrame(rafA);
      window.cancelAnimationFrame(rafB);
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, [router.asPath]);

  return (
    <>
      <Component {...pageProps} />
      {popup ? <ValidationPopup type={popup.type} message={popup.message} onClose={() => setPopup(null)} /> : null}
      {confirmState ? (
        <ConfirmPopup
          title={confirmState.title}
          message={confirmState.message}
          confirmLabel={confirmState.confirmLabel}
          cancelLabel={confirmState.cancelLabel}
          tone={confirmState.tone}
          onConfirm={runConfirm}
          onCancel={closeConfirm}
        />
      ) : null}
    </>
  );
}
