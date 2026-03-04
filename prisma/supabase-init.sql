-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "email_verified_at" TIMESTAMP(0),
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(32) NOT NULL DEFAULT 'pasien',
    "spesialis" VARCHAR(255),
    "alamat" VARCHAR(255),
    "telepon" VARCHAR(255),
    "no_hp" VARCHAR(255),
    "tanggal_lahir" DATE,
    "jenis_kelamin" VARCHAR(32),
    "nik" VARCHAR(16),
    "no_rm" VARCHAR(30),
    "qr_token" VARCHAR(255),
    "qr_path" VARCHAR(255),
    "role_id" BIGINT,
    "remember_token" VARCHAR(100),
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pendaftarans" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "dokter_id" BIGINT,
    "diterima_oleh_dokter_id" BIGINT,
    "nama" VARCHAR(255) NOT NULL,
    "tanggal_lahir" DATE NOT NULL,
    "jenis_kelamin" VARCHAR(20) NOT NULL,
    "no_hp" VARCHAR(20) NOT NULL,
    "nik" VARCHAR(20) NOT NULL,
    "keluhan" TEXT NOT NULL,
    "tanggal_kunjungan" DATE,
    "jam_kunjungan" TIME(0),
    "spesialis" VARCHAR(255),
    "status" VARCHAR(255) NOT NULL DEFAULT 'menunggu',
    "nomor_urut" INTEGER,
    "kode_antrian" VARCHAR(16),
    "qr_token" VARCHAR(36),
    "qr_path" VARCHAR(255),
    "checkin_at" TIMESTAMP(0),
    "checked_in_at" TIMESTAMP(0),
    "checked_in_by" BIGINT,
    "no_show_at" TIMESTAMP(0),
    "no_show_by" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "pendaftarans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rekam_medis" (
    "id" BIGSERIAL NOT NULL,
    "pendaftaran_id" BIGINT NOT NULL,
    "pasien_id" BIGINT,
    "dokter_id" BIGINT NOT NULL,
    "tanggal" DATE,
    "diagnosa" VARCHAR(255) NOT NULL,
    "tindakan" VARCHAR(255) NOT NULL,
    "resep" TEXT,
    "catatan" TEXT,
    "chain_index" INTEGER,
    "prev_hash" VARCHAR(64),
    "block_hash" VARCHAR(64),
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "rekam_medis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jadwal_dokters" (
    "id" BIGSERIAL NOT NULL,
    "dokter_id" BIGINT NOT NULL,
    "pasien_id" BIGINT,
    "hari" VARCHAR(255) NOT NULL,
    "jam_mulai" TIME(0) NOT NULL,
    "jam_selesai" TIME(0) NOT NULL,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "jadwal_dokters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pembayarans" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "kode_tagihan" VARCHAR(255) NOT NULL,
    "jumlah" DECIMAL(10,2) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "bukti_pembayaran" VARCHAR(255),
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "pembayarans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifikasis" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "judul" VARCHAR(255) NOT NULL,
    "pesan" TEXT NOT NULL,
    "tipe" VARCHAR(255),
    "link" VARCHAR(255),
    "dibaca" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "notifikasis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_unique" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_no_rm_unique" ON "users"("no_rm");

-- CreateIndex
CREATE UNIQUE INDEX "users_qr_token_unique" ON "users"("qr_token");

-- CreateIndex
CREATE INDEX "pendaftarans_user_id_idx" ON "pendaftarans"("user_id");

-- CreateIndex
CREATE INDEX "pendaftarans_dokter_id_idx" ON "pendaftarans"("dokter_id");

-- CreateIndex
CREATE INDEX "pendaftarans_diterima_oleh_dokter_id_idx" ON "pendaftarans"("diterima_oleh_dokter_id");

-- CreateIndex
CREATE INDEX "rekam_medis_dokter_id_idx" ON "rekam_medis"("dokter_id");

-- CreateIndex
CREATE INDEX "rekam_medis_pendaftaran_id_idx" ON "rekam_medis"("pendaftaran_id");

-- CreateIndex
CREATE INDEX "rekam_medis_pasien_id_idx" ON "rekam_medis"("pasien_id");

-- CreateIndex
CREATE INDEX "rekam_medis_pasien_id_chain_index_idx" ON "rekam_medis"("pasien_id", "chain_index");

-- CreateIndex
CREATE INDEX "jadwal_dokters_dokter_id_idx" ON "jadwal_dokters"("dokter_id");

-- CreateIndex
CREATE UNIQUE INDEX "pembayarans_kode_tagihan_unique" ON "pembayarans"("kode_tagihan");

-- CreateIndex
CREATE INDEX "pembayarans_user_id_idx" ON "pembayarans"("user_id");

-- CreateIndex
CREATE INDEX "notifikasis_user_id_dibaca_created_at_idx" ON "notifikasis"("user_id", "dibaca", "created_at");

-- CreateIndex
CREATE INDEX "notifikasis_user_id_idx" ON "notifikasis"("user_id");

-- AddForeignKey
ALTER TABLE "pendaftarans" ADD CONSTRAINT "pendaftarans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "pendaftarans" ADD CONSTRAINT "pendaftarans_dokter_id_fkey" FOREIGN KEY ("dokter_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "pendaftarans" ADD CONSTRAINT "pendaftarans_diterima_oleh_dokter_id_fkey" FOREIGN KEY ("diterima_oleh_dokter_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "rekam_medis" ADD CONSTRAINT "rekam_medis_dokter_id_fkey" FOREIGN KEY ("dokter_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "rekam_medis" ADD CONSTRAINT "rekam_medis_pasien_id_fkey" FOREIGN KEY ("pasien_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "rekam_medis" ADD CONSTRAINT "rekam_medis_pendaftaran_id_fkey" FOREIGN KEY ("pendaftaran_id") REFERENCES "pendaftarans"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "jadwal_dokters" ADD CONSTRAINT "jadwal_dokters_dokter_id_fkey" FOREIGN KEY ("dokter_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "pembayarans" ADD CONSTRAINT "pembayarans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "notifikasis" ADD CONSTRAINT "notifikasis_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

