import { useMemo } from "react";

type DoctorOption = {
  id: string;
  name: string;
  spesialis: string | null;
};

type RegistrationFormProps = {
  actionPath?: string;
  selectedTanggal?: string;
  selectedSpesialis?: string;
  spesialisList: string[];
  dokters: DoctorOption[];
  prefNama: string;
  prefTgl: string;
  prefJk: string;
  prefHp: string;
  prefNik: string;
  prefAlamat: string;
  errorMessages?: string[];
  successMessage?: string;
  antrian?: string;
};

export default function RegistrationForm({
  actionPath = "/pendaftaran",
  selectedTanggal = "",
  selectedSpesialis = "",
  spesialisList,
  dokters,
  prefNama,
  prefTgl,
  prefJk,
  prefHp,
  prefNik,
  prefAlamat,
  errorMessages,
  successMessage,
  antrian,
}: RegistrationFormProps) {
  const hasErrors = (errorMessages?.length ?? 0) > 0;
  const dokterDisabled = useMemo(() => dokters.length === 0, [dokters.length]);

  return (
    <>
      <div className="mt-10 mx-auto max-w-6xl px-2">
        <h2 className="mb-4 text-center text-3xl font-extrabold text-blue-800">Daftar Konsultasi Pasien</h2>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-xl">
          {hasErrors ? (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              <div className="mb-1 font-semibold">Terjadi kesalahan pada input Anda:</div>
              <ul className="list-inside list-disc text-sm">
                {errorMessages?.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <form action={actionPath} method="POST" className="space-y-4">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label htmlFor="nama" className="mb-1 block text-sm font-semibold text-gray-700">
                  Nama Lengkap
                </label>
                <input type="hidden" name="nama" value={prefNama} />
                <input type="text" id="nama" value={prefNama} readOnly className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-700" />
              </div>

              <div>
                <label htmlFor="tanggal_lahir" className="mb-1 block text-sm font-semibold text-gray-700">
                  Tanggal Lahir
                </label>
                <input type="hidden" name="tanggal_lahir" value={prefTgl} />
                <input type="date" id="tanggal_lahir" value={prefTgl} readOnly className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-700" />
              </div>

              <div>
                <label htmlFor="jenis_kelamin" className="mb-1 block text-sm font-semibold text-gray-700">
                  Jenis Kelamin
                </label>
                <input type="hidden" name="jenis_kelamin" value={prefJk} />
                <input type="text" id="jenis_kelamin" value={prefJk} readOnly className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-700" />
              </div>

              <div>
                <label htmlFor="no_hp" className="mb-1 block text-sm font-semibold text-gray-700">
                  Nomor HP
                </label>
                <input type="hidden" name="no_hp" value={prefHp} />
                <input type="text" id="no_hp" value={prefHp} readOnly className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-700" />
              </div>

              <div>
                <label htmlFor="nik" className="mb-1 block text-sm font-semibold text-gray-700">
                  NIK
                </label>
                <input type="hidden" name="nik" value={prefNik} />
                <input type="text" id="nik" value={prefNik} readOnly className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-700" />
              </div>

              <div>
                <label htmlFor="alamat" className="mb-1 block text-sm font-semibold text-gray-700">
                  Alamat
                </label>
                <input type="hidden" name="alamat" value={prefAlamat} />
                <input type="text" id="alamat" value={prefAlamat} readOnly className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-700" />
              </div>

              <div>
                <label htmlFor="tanggal_kunjungan" className="mb-1 block text-sm font-semibold text-gray-700">
                  Tanggal Kunjungan
                </label>
                <input type="date" id="tanggal_kunjungan" name="tanggal_kunjungan" defaultValue={selectedTanggal} required className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200" />
              </div>

              <div>
                <label htmlFor="spesialis" className="mb-1 block text-sm font-semibold text-gray-700">
                  Spesialis Dokter
                </label>
                <select id="spesialis" name="spesialis" defaultValue={selectedSpesialis} required className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200">
                  <option value="" disabled>
                    -- Pilih Spesialis --
                  </option>
                  {spesialisList.map((sp) => (
                    <option key={sp} value={sp}>
                      {sp}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">Pilih spesialis untuk mempermudah filter dokter.</p>
              </div>

              <div>
                <label htmlFor="dokter_id" className="mb-1 block text-sm font-semibold text-gray-700">
                  Pilih Dokter
                </label>
                <select id="dokter_id" name="dokter_id" defaultValue="" required disabled={dokterDisabled} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-gray-100">
                  <option value="" disabled>
                    -- Pilih Dokter --
                  </option>
                  {dokters.map((dokter) => (
                    <option key={dokter.id} value={dokter.id}>
                      {dokter.name} ({dokter.spesialis ?? "-"})
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">Kuota maksimal 5 pasien per dokter per hari.</p>
              </div>

              <div>
                <label htmlFor="jam_kunjungan" className="mb-1 block text-sm font-semibold text-gray-700">
                  Jam Kunjungan
                </label>
                <input type="time" id="jam_kunjungan" name="jam_kunjungan" required className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200" />
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <label htmlFor="keluhan" className="mb-1 block text-sm font-semibold text-gray-700">
                  Keluhan
                </label>
                <textarea id="keluhan" name="keluhan" rows={2} required className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200" placeholder="Contoh: Gigi sakit saat makan/minum..." />
              </div>
            </div>

            <div className="pt-2 text-center">
              <button type="submit" className="rounded-full bg-blue-600 px-6 py-2 font-semibold text-white shadow transition hover:bg-blue-700">
                <i className="fas fa-paper-plane mr-2" /> Kirim Pendaftaran
              </button>
            </div>
          </form>
        </div>
      </div>

      {successMessage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h2 className="mb-2 text-xl font-bold text-blue-800">Pendaftaran Berhasil!</h2>
            <p className="mb-4 text-gray-700">{successMessage}</p>

            {antrian ? (
              <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-800">
                <div className="font-semibold">Nomor Antrian Anda:</div>
                <div className="mt-1 text-2xl font-extrabold tracking-wide">{antrian}</div>
              </div>
            ) : null}

            <div className="text-right">
              <a href={actionPath} className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
                OK
              </a>
            </div>
          </div>
        </div>
      ) : null}

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              const t = document.getElementById('tanggal_kunjungan');
              const s = document.getElementById('spesialis');
              function reloadOptions() {
                const tanggal = t ? t.value : '';
                const spesialis = s ? s.value : '';
                const url = new URL(window.location.href);
                if (tanggal) url.searchParams.set('tanggal_kunjungan', tanggal);
                else url.searchParams.delete('tanggal_kunjungan');
                if (spesialis) url.searchParams.set('spesialis', spesialis);
                else url.searchParams.delete('spesialis');
                if (tanggal || spesialis) window.location.href = url.toString();
              }
              if (t) t.addEventListener('change', reloadOptions);
              if (s) s.addEventListener('change', reloadOptions);
            })();
          `,
        }}
      />
    </>
  );
}
