import { useEffect } from "react";

type ConfirmPopupProps = {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "warning" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmPopup({
  title = "Konfirmasi",
  message,
  confirmLabel = "Lanjutkan",
  cancelLabel = "Batal",
  tone = "warning",
  onConfirm,
  onCancel,
}: ConfirmPopupProps) {
  const palette =
    tone === "danger"
      ? {
          border: "var(--error-600)",
          bg: "var(--popup-error-bg)",
          color: "var(--error-600)",
          confirmClass: "confirm-popup-btn-danger",
          icon: "!",
        }
      : {
          border: "var(--warning-600)",
          bg: "var(--popup-warning-bg)",
          color: "var(--warning-600)",
          confirmClass: "",
          icon: "?",
        };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  return (
    <div className="validation-popup-overlay" role="dialog" aria-modal="true" aria-live="assertive">
      <div
        className="validation-popup-card confirm-popup-card"
        style={{
          borderColor: palette.border,
          borderWidth: "2px",
        }}
      >
        <button type="button" className="validation-popup-close" onClick={onCancel} aria-label="Tutup konfirmasi">
          ×
        </button>
        <div className="validation-popup-content">
          <div
            className="validation-popup-icon"
            style={{
              background: palette.bg,
              color: palette.color,
              borderColor: palette.border,
            }}
          >
            {palette.icon}
          </div>
          <div className="validation-popup-text">
            <div className="validation-popup-title" style={{ color: palette.color }}>
              {title}
            </div>
            <div className="validation-popup-message">{message}</div>
            <div className="confirm-popup-actions">
              <button type="button" className="confirm-popup-btn confirm-popup-btn-cancel" onClick={onCancel}>
                {cancelLabel}
              </button>
              <button type="button" className={`confirm-popup-btn confirm-popup-btn-confirm ${palette.confirmClass}`.trim()} onClick={onConfirm}>
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
