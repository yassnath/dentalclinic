import { useEffect, useMemo, useState } from "react";

type PatientIdentityCardProps = {
  name: string;
  noRm?: string | null;
  qrCandidates?: Array<string | null | undefined>;
  downloadHref?: string | null;
  downloadName?: string;
  onPrint?: () => void;
  printLabel?: string;
  title?: string;
  subtitle?: string;
};

function uniqueCandidates(values: Array<string | null | undefined>) {
  return Array.from(
    new Set(
      values
        .map((value) => String(value ?? "").trim())
        .filter((value) => value.length > 0),
    ),
  );
}

export default function PatientIdentityCard({
  name,
  noRm,
  qrCandidates = [],
  downloadHref,
  downloadName,
  onPrint,
  printLabel = "Cetak Kartu",
  title = "Kartu Pasien",
  subtitle = "Tunjukkan ke resepsionis/dokter",
}: PatientIdentityCardProps) {
  const candidates = useMemo(() => uniqueCandidates(qrCandidates), [qrCandidates]);
  const candidateKey = candidates.join("||");
  const [qrIndex, setQrIndex] = useState(0);

  useEffect(() => {
    setQrIndex(0);
  }, [candidateKey]);

  const qrSrc = candidates[qrIndex] ?? null;
  const effectiveDownloadHref = String(downloadHref ?? qrSrc ?? "").trim() || null;
  const hasActions = Boolean(effectiveDownloadHref) || Boolean(onPrint);

  return (
    <>
      <div className="patient-identity-card">
        <div className="patient-identity-card__tone" aria-hidden="true" />

        <div className="patient-identity-card__top">
          <div>
            <h2 className="patient-identity-card__title">{title}</h2>
            <div className="patient-identity-card__subtitle">{subtitle}</div>
          </div>
          <img src="/images/logo2.png" className="patient-identity-card__logo" alt="Logo" />
        </div>

        <div className="patient-identity-card__body">
          <div className="patient-identity-card__details">
            <div className="patient-identity-card__label">Nama</div>
            <div className="patient-identity-card__value">{name}</div>

            <div className="patient-identity-card__label patient-identity-card__label-gap">No. RM</div>
            <div className="patient-identity-card__value patient-identity-card__value-wide">{noRm ?? "-"}</div>
          </div>

          <div className="patient-identity-card__qr-col">
            {qrSrc ? (
              <div className="patient-identity-card__qr-shell">
                <img
                  src={qrSrc}
                  alt="QR Pasien"
                  className="patient-identity-card__qr"
                  onError={() => {
                    setQrIndex((current) => {
                      const next = current + 1;
                      return next < candidates.length ? next : current;
                    });
                  }}
                />
              </div>
            ) : (
              <div className="patient-identity-card__qr-empty">QR belum tersedia</div>
            )}
          </div>
        </div>

        {hasActions ? (
          <div className="patient-identity-card__actions no-print">
            {effectiveDownloadHref ? (
              <a href={effectiveDownloadHref} download={downloadName} className="patient-identity-card__download">
                Unduh QR
              </a>
            ) : (
              <span className="patient-identity-card__download patient-identity-card__download--muted">QR belum tersedia</span>
            )}

            {onPrint ? (
              <button type="button" onClick={onPrint} className="patient-identity-card__print-btn">
                {printLabel}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      <style jsx global>{`
        .patient-identity-card {
          position: relative;
          display: flex;
          min-height: 25rem;
          width: 100%;
          flex-direction: column;
          gap: 1.75rem;
          overflow: hidden;
          border-radius: 1.75rem;
          border: 1px solid rgba(96, 165, 250, 0.22);
          background:
            radial-gradient(circle at top left, rgba(59, 130, 246, 0.2), transparent 42%),
            linear-gradient(135deg, #142646 0%, #101827 56%, #18181b 100%);
          padding: 1.75rem;
          color: #f8fafc;
          box-shadow:
            0 24px 50px rgba(2, 6, 23, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .patient-identity-card__tone {
          position: absolute;
          inset: auto -12% -22% auto;
          height: 15rem;
          width: 15rem;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 68%);
          filter: blur(10px);
          pointer-events: none;
        }

        .patient-identity-card__top {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }

        .patient-identity-card__title {
          margin: 0;
          font-size: 2rem;
          line-height: 1.05;
          font-weight: 700;
          color: #60a5fa;
        }

        .patient-identity-card__subtitle {
          margin-top: 0.35rem;
          font-size: 0.95rem;
          line-height: 1.35;
          color: #cbd5e1;
        }

        .patient-identity-card__logo {
          height: 3.2rem;
          width: auto;
          flex-shrink: 0;
        }

        .patient-identity-card__body {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 1.5rem;
          align-items: center;
          flex: 1 1 auto;
        }

        .patient-identity-card__details {
          min-width: 0;
        }

        .patient-identity-card__label {
          font-size: 1rem;
          line-height: 1.3;
          color: #cbd5e1;
        }

        .patient-identity-card__label-gap {
          margin-top: 0.85rem;
        }

        .patient-identity-card__value {
          margin-top: 0.45rem;
          font-size: 1.1rem;
          line-height: 1.25;
          font-weight: 700;
          color: #ffffff;
        }

        .patient-identity-card__value-wide {
          letter-spacing: 0.02em;
        }

        .patient-identity-card__qr-col {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .patient-identity-card__qr-shell {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 1.5rem;
          border: 1px solid rgba(59, 130, 246, 0.5);
          background: #ffffff;
          padding: 0.85rem;
          box-shadow: 0 18px 40px rgba(2, 6, 23, 0.35);
        }

        .patient-identity-card__qr {
          display: block;
          height: 9.5rem;
          width: 9.5rem;
          image-rendering: pixelated;
        }

        .patient-identity-card__qr-empty {
          display: flex;
          min-height: 9.5rem;
          min-width: 9.5rem;
          align-items: center;
          justify-content: center;
          border-radius: 1.5rem;
          border: 1px dashed rgba(148, 163, 184, 0.35);
          color: #94a3b8;
          font-size: 0.95rem;
          text-align: center;
          padding: 0.9rem;
        }

        .patient-identity-card__actions {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: auto;
        }

        .patient-identity-card__download {
          font-size: 0.95rem;
          font-weight: 500;
          color: #60a5fa;
          text-decoration: none;
        }

        .patient-identity-card__download:hover {
          text-decoration: underline;
        }

        .patient-identity-card__download--muted {
          color: #94a3b8;
        }

        .patient-identity-card__print-btn {
          border: 0;
          border-radius: 0.95rem;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          padding: 0.9rem 1.4rem;
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          box-shadow: 0 14px 30px rgba(37, 99, 235, 0.35);
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            filter 0.2s ease;
        }

        .patient-identity-card__print-btn:hover {
          transform: translateY(-1px);
          filter: brightness(1.03);
          box-shadow: 0 18px 34px rgba(37, 99, 235, 0.42);
        }

        @media (max-width: 640px) {
          .patient-identity-card {
            min-height: auto;
            gap: 1.25rem;
            padding: 1.25rem;
          }

          .patient-identity-card__title {
            font-size: 1.6rem;
          }

          .patient-identity-card__subtitle {
            font-size: 0.88rem;
          }

          .patient-identity-card__logo {
            height: 2.65rem;
          }

          .patient-identity-card__body {
            grid-template-columns: 1fr;
            gap: 1.1rem;
          }

          .patient-identity-card__qr-shell,
          .patient-identity-card__qr-empty {
            margin-left: auto;
            margin-right: auto;
          }

          .patient-identity-card__qr,
          .patient-identity-card__qr-empty {
            height: 8.5rem;
            width: 8.5rem;
            min-height: 8.5rem;
            min-width: 8.5rem;
          }

          .patient-identity-card__actions {
            flex-direction: column;
            align-items: stretch;
          }

          .patient-identity-card__print-btn {
            width: 100%;
          }
        }

        @media print {
          @page {
            size: auto;
            margin: 0;
          }

          html,
          body {
            margin: 0 !important;
            background: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          body * {
            visibility: hidden !important;
          }

          .patient-identity-card,
          .patient-identity-card * {
            visibility: visible !important;
          }

          .patient-identity-card {
            position: fixed !important;
            inset: 0 !important;
            margin: auto !important;
            height: 53.98mm !important;
            width: 85.6mm !important;
            min-height: 53.98mm !important;
            max-width: none !important;
            gap: 3.2mm !important;
            padding: 4.4mm !important;
            border-radius: 4.8mm !important;
            border: 1px solid rgba(96, 165, 250, 0.3) !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            box-shadow: none !important;
          }

          .patient-identity-card__tone {
            height: 36mm !important;
            width: 36mm !important;
            inset: auto -8mm -12mm auto !important;
            filter: blur(5mm) !important;
          }

          .patient-identity-card__top {
            gap: 2.5mm !important;
          }

          .patient-identity-card__title {
            font-size: 5.2mm !important;
          }

          .patient-identity-card__subtitle {
            margin-top: 1mm !important;
            font-size: 2.8mm !important;
            line-height: 1.2 !important;
          }

          .patient-identity-card__logo {
            height: 8.5mm !important;
          }

          .patient-identity-card__body {
            grid-template-columns: minmax(0, 1fr) auto !important;
            gap: 3.5mm !important;
          }

          .patient-identity-card__label {
            font-size: 2.7mm !important;
            line-height: 1.15 !important;
          }

          .patient-identity-card__label-gap {
            margin-top: 2.2mm !important;
          }

          .patient-identity-card__value {
            margin-top: 1.05mm !important;
            font-size: 3.6mm !important;
            line-height: 1.18 !important;
          }

          .patient-identity-card__qr-shell,
          .patient-identity-card__qr-empty {
            height: 24mm !important;
            width: 24mm !important;
            min-height: 24mm !important;
            min-width: 24mm !important;
            padding: 1.3mm !important;
            border-radius: 3.2mm !important;
            box-shadow: none !important;
          }

          .patient-identity-card__qr {
            height: 21.2mm !important;
            width: 21.2mm !important;
          }

          .patient-identity-card__actions,
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
