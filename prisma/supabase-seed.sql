CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO "users" (
  "name",
  "username",
  "email",
  "password",
  "role",
  "spesialis",
  "created_at",
  "updated_at"
)
VALUES
  (
    'Admin User',
    'admin',
    'admin@gmail.com',
    crypt('password', gen_salt('bf')),
    'admin',
    NULL,
    NOW(),
    NOW()
  ),
  (
    'Dokter User',
    'dokter',
    'dokter@gmail.com',
    crypt('password', gen_salt('bf')),
    'dokter',
    'Ortodonti',
    NOW(),
    NOW()
  ),
  (
    'Resepsionis User',
    'resepsionis',
    'resepsionis@gmail.com',
    crypt('password', gen_salt('bf')),
    'resepsionis',
    NULL,
    NOW(),
    NOW()
  ),
  (
    'Pasien User',
    'pasien',
    'pasien@gmail.com',
    crypt('password', gen_salt('bf')),
    'pasien',
    NULL,
    NOW(),
    NOW()
  )
ON CONFLICT ("email") DO UPDATE
SET
  "name" = EXCLUDED."name",
  "username" = EXCLUDED."username",
  "password" = EXCLUDED."password",
  "role" = EXCLUDED."role",
  "spesialis" = EXCLUDED."spesialis",
  "updated_at" = NOW();
