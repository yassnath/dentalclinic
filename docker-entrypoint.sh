#!/bin/sh
set -eu

echo "[entrypoint] prisma generate"
npx prisma generate

echo "[entrypoint] waiting database and pushing schema"
retry=0
until npx prisma db push --skip-generate >/tmp/prisma-db-push.log 2>&1; do
  retry=$((retry + 1))
  if [ "$retry" -ge 30 ]; then
    echo "[entrypoint] prisma db push failed after retries"
    cat /tmp/prisma-db-push.log
    exit 1
  fi
  sleep 2
done

if [ "${RUN_DB_SEED:-0}" = "1" ]; then
  echo "[entrypoint] running seed"
  npm run db:seed || true
fi

echo "[entrypoint] start next server"
npm run start
