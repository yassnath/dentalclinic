import { useEffect } from "react";

export type ValidationType = "success" | "error" | "warning" | "info";

type ValidationPopupProps = {
  type: ValidationType;
  message: string;
  onClose: () => void;
  durationMs?: number;
};

const toneByType: Record<ValidationType, { title: string; icon: string; bg: string; border: string; color: string }> = {
  success: {
    title: "Berhasil",
    icon: "✓",
    bg: "var(--popup-success-bg)",
    border: "var(--success-600)",
    color: "var(--success-600)",
  },
  error: {
    title: "Gagal",
    icon: "!",
    bg: "var(--popup-error-bg)",
    border: "var(--error-600)",
    color: "var(--error-600)",
  },
  warning: {
    title: "Peringatan",
    icon: "!",
    bg: "var(--popup-warning-bg)",
    border: "var(--warning-600)",
    color: "var(--warning-600)",
  },
  info: {
    title: "Informasi",
    icon: "i",
    bg: "var(--popup-info-bg)",
    border: "var(--info-main)",
    color: "var(--info-main)",
  },
};

export default function ValidationPopup({ type, message, onClose, durationMs = 3400 }: ValidationPopupProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, durationMs);
    return () => clearTimeout(timer);
  }, [durationMs, onClose]);

  const tone = toneByType[type];

  return (
    <div className="validation-popup-overlay" role="dialog" aria-modal="true" aria-live="polite">
      <div className="validation-popup-card" style={{ borderColor: tone.border }}>
        <button type="button" className="validation-popup-close" onClick={onClose} aria-label="Tutup notifikasi">
          ×
        </button>
        <div className="validation-popup-content">
          <div className="validation-popup-icon" style={{ background: tone.bg, color: tone.color, borderColor: tone.border }}>
            {tone.icon}
          </div>
          <div className="validation-popup-text">
            <div className="validation-popup-title" style={{ color: tone.color }}>
              {tone.title}
            </div>
            <div className="validation-popup-message">{message}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
