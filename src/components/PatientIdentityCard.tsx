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
  const actionNodes = (
    <>
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
    </>
  );

  return (
    <>
      <div className="patient-identity-card">
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
                <div className="patient-identity-card__qr-stage">
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
              </div>
            ) : (
              <div className="patient-identity-card__qr-shell">
                <div className="patient-identity-card__qr-empty">QR belum tersedia</div>
              </div>
            )}
          </div>
        </div>

        {hasActions ? (
          <div className="patient-identity-card__actions patient-identity-card__actions--inside no-print">
            {actionNodes}
          </div>
        ) : null}
      </div>

      {hasActions ? (
        <div className="patient-identity-card__actions patient-identity-card__actions--outside no-print">
          {actionNodes}
        </div>
      ) : null}

      <style jsx global>{`
        .patient-identity-card {
          position: relative;
          display: flex;
          aspect-ratio: 85.6 / 53.98;
          min-height: 0;
          width: 100%;
          flex-direction: column;
          justify-content: flex-start;
          gap: 1.4rem;
          overflow: hidden;
          border-radius: 1.6rem;
          border: 1px solid rgba(148, 163, 184, 0.2);
          background:
            radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.18), transparent 38%),
            linear-gradient(90deg, #192f56 0%, #1d2230 48%, #1b1b1f 100%);
          padding: clamp(1.5rem, 4vw, 2rem);
          color: #f8fafc;
          box-shadow:
            0 20px 44px rgba(2, 6, 23, 0.48),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .patient-identity-card__top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.25rem;
        }

        .patient-identity-card__top > div {
          min-width: 0;
        }

        .patient-identity-card__title {
          margin: 0;
          font-size: clamp(2rem, 4.4vw, 2.85rem);
          line-height: 1.05;
          font-weight: 700;
          color: #ffffff !important;
        }

        .patient-identity-card__subtitle {
          margin-top: 0.25rem;
          font-size: clamp(1rem, 2vw, 1.3rem);
          line-height: 1.25;
          color: #cbd5e1;
        }

        .patient-identity-card__logo {
          height: clamp(2.8rem, 5vw, 3.4rem);
          width: auto;
          flex-shrink: 0;
        }

        .patient-identity-card__body {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(10rem, 34%);
          gap: 1.6rem;
          align-items: center;
          flex: 1;
        }

        .patient-identity-card__details {
          min-width: 0;
          align-self: start;
          padding-top: 0.2rem;
        }

        .patient-identity-card__label {
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          line-height: 1.25;
          color: #cbd5e1;
        }

        .patient-identity-card__label-gap {
          margin-top: 1rem;
        }

        .patient-identity-card__value {
          margin-top: 0.5rem;
          font-size: clamp(1.55rem, 3vw, 2.2rem);
          line-height: 1.16;
          font-weight: 700;
          color: #ffffff;
        }

        .patient-identity-card__value-wide {
          letter-spacing: 0.02em;
        }

        .patient-identity-card__qr-col {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          align-self: center;
        }

        .patient-identity-card__qr-shell {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 1.55rem;
          border: 1px solid rgba(59, 130, 246, 0.45);
          background: rgba(17, 24, 39, 0.36);
          padding: 0.75rem;
          box-shadow: 0 16px 34px rgba(2, 6, 23, 0.28);
        }

        .patient-identity-card__qr-stage {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 1rem;
          background: #ffffff;
          padding: 0.35rem;
        }

        .patient-identity-card__qr {
          display: block;
          height: clamp(9rem, 18vw, 10.6rem);
          width: clamp(9rem, 18vw, 10.6rem);
          image-rendering: pixelated;
        }

        .patient-identity-card__qr-empty {
          display: flex;
          min-height: clamp(9rem, 18vw, 10.6rem);
          min-width: clamp(9rem, 18vw, 10.6rem);
          align-items: center;
          justify-content: center;
          border-radius: 1rem;
          border: 1px dashed rgba(148, 163, 184, 0.35);
          background: #ffffff;
          color: #64748b;
          font-size: 0.95rem;
          text-align: center;
          padding: 0.8rem;
        }

        .patient-identity-card__actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 0.2rem;
          padding-bottom: 0.7rem;
        }

        .patient-identity-card__actions--outside {
          display: none;
          padding-top: 0.35rem;
          padding-bottom: 0;
        }

        @media (min-width: 641px) {
          .patient-identity-card__actions--inside {
            transform: translateY(-0.55rem);
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .patient-identity-card {
            gap: 1.05rem;
            padding: 1.35rem;
          }

          .patient-identity-card__title {
            font-size: clamp(1.8rem, 4.3vw, 2.2rem);
          }

          .patient-identity-card__subtitle {
            font-size: 0.96rem;
          }

          .patient-identity-card__body {
            grid-template-columns: minmax(0, 1fr) minmax(8.8rem, 36%);
            gap: 1.05rem;
          }

          .patient-identity-card__qr,
          .patient-identity-card__qr-empty {
            height: clamp(7.6rem, 18vw, 8.8rem);
            width: clamp(7.6rem, 18vw, 8.8rem);
            min-height: clamp(7.6rem, 18vw, 8.8rem);
            min-width: clamp(7.6rem, 18vw, 8.8rem);
          }
        }

        .patient-identity-card__download {
          font-size: clamp(1rem, 1.9vw, 1.2rem);
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
          border-radius: 0.9rem;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          padding: 0.9rem 1.55rem;
          font-size: clamp(1rem, 1.9vw, 1.2rem);
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
            aspect-ratio: 85.6 / 53.98;
            min-height: 0;
            gap: 0.82rem;
            padding: 0.95rem;
            border-radius: 1.2rem;
          }

          .patient-identity-card__top {
            gap: 0.68rem;
          }

          .patient-identity-card__title {
            font-size: clamp(1.1rem, 4.8vw, 1.3rem);
            line-height: 1.04;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .patient-identity-card__subtitle {
            margin-top: 0.08rem;
            font-size: 0.72rem;
            line-height: 1.16;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .patient-identity-card__logo {
            height: 2.15rem;
          }

          .patient-identity-card__body {
            grid-template-columns: minmax(0, 1fr) minmax(6.75rem, 39%);
            gap: 0.72rem;
          }

          .patient-identity-card__qr-col {
            justify-content: flex-end;
          }

          .patient-identity-card__qr-shell {
            margin: 0;
            padding: 0.4rem;
            border-radius: 1rem;
          }

          .patient-identity-card__qr-stage {
            padding: 0.24rem;
          }

          .patient-identity-card__qr,
          .patient-identity-card__qr-empty {
            height: clamp(6.4rem, 31vw, 7.6rem);
            width: clamp(6.4rem, 31vw, 7.6rem);
            min-height: clamp(6.4rem, 31vw, 7.6rem);
            min-width: clamp(6.4rem, 31vw, 7.6rem);
          }

          .patient-identity-card__label {
            font-size: 0.72rem;
            line-height: 1.08;
            white-space: nowrap;
          }

          .patient-identity-card__label-gap {
            margin-top: 0.46rem;
          }

          .patient-identity-card__value {
            margin-top: 0.24rem;
            font-size: clamp(0.98rem, 4.3vw, 1.15rem);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .patient-identity-card__value-wide {
            letter-spacing: 0.01em;
            font-size: clamp(0.9rem, 4vw, 1.05rem);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .patient-identity-card__qr-empty {
            font-size: 0.72rem;
            padding: 0.42rem;
          }

          .patient-identity-card__actions {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 0.55rem;
            padding-top: 0.08rem;
            padding-bottom: 0.08rem;
            transform: none;
          }

          .patient-identity-card__actions--inside {
            display: none;
          }

          .patient-identity-card__actions--outside {
            display: flex;
            margin-top: 0.5rem;
            padding-top: 0.2rem;
          }

          .patient-identity-card__download {
            font-size: 0.76rem;
            white-space: nowrap;
          }

          .patient-identity-card__print-btn {
            width: auto;
            padding: 0.5rem 0.8rem;
            border-radius: 0.75rem;
            font-size: 0.76rem;
            white-space: nowrap;
            box-shadow: 0 9px 18px rgba(37, 99, 235, 0.28);
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
            gap: 3.25mm !important;
            padding: 4.3mm !important;
            border-radius: 4.8mm !important;
            border: 1px solid rgba(148, 163, 184, 0.22) !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            box-shadow: none !important;
          }

          .patient-identity-card__top {
            gap: 2.5mm !important;
          }

          .patient-identity-card__title {
            font-size: 5.2mm !important;
          }

          .patient-identity-card__subtitle {
            margin-top: 0.8mm !important;
            font-size: 2.8mm !important;
            line-height: 1.22 !important;
          }

          .patient-identity-card__logo {
            height: 8.1mm !important;
          }

          .patient-identity-card__body {
            grid-template-columns: minmax(0, 1fr) 26mm !important;
            gap: 3.2mm !important;
          }

          .patient-identity-card__label {
            font-size: 2.65mm !important;
            line-height: 1.15 !important;
          }

          .patient-identity-card__label-gap {
            margin-top: 2.05mm !important;
          }

          .patient-identity-card__value {
            margin-top: 0.95mm !important;
            font-size: 3.55mm !important;
            line-height: 1.16 !important;
          }

          .patient-identity-card__qr-shell {
            padding: 1.15mm !important;
            border-radius: 3.4mm !important;
            box-shadow: none !important;
          }

          .patient-identity-card__qr-stage,
          .patient-identity-card__qr-empty {
            border-radius: 2.35mm !important;
            padding: 0.6mm !important;
          }

          .patient-identity-card__qr {
            height: 20.5mm !important;
            width: 20.5mm !important;
          }

          .patient-identity-card__qr-empty {
            height: 21.7mm !important;
            width: 21.7mm !important;
            min-height: 21.7mm !important;
            min-width: 21.7mm !important;
            font-size: 2.2mm !important;
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
