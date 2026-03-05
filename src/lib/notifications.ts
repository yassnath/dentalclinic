import { prisma } from "@/lib/prisma";

type NotificationColumns = Set<string>;

type NotificationRawRow = {
  id: string;
  judul: string;
  pesan: string;
  tipe: string | null;
  link: string | null;
  dibaca: boolean;
  created_at: Date | string | null;
};

export type SafeNotification = {
  id: string;
  judul: string;
  pesan: string;
  tipe: string | null;
  link: string | null;
  dibaca: boolean;
  createdAt: string | null;
};

let cachedColumns: { value: NotificationColumns; expiresAt: number } | null = null;

async function resolveNotificationColumns(): Promise<NotificationColumns> {
  const now = Date.now();
  if (cachedColumns && cachedColumns.expiresAt > now) {
    return cachedColumns.value;
  }

  try {
    const rows = await prisma.$queryRaw<Array<{ column_name: string }>>`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'notifikasis'
    `;
    const value = new Set(rows.map((row) => row.column_name));
    cachedColumns = { value, expiresAt: now + 30_000 };
    return value;
  } catch {
    const empty = new Set<string>();
    cachedColumns = { value: empty, expiresAt: now + 10_000 };
    return empty;
  }
}

function hasRequiredColumns(columns: NotificationColumns, required: string[]) {
  return required.every((column) => columns.has(column));
}

export async function safeUnreadNotifCount(userId: bigint): Promise<number> {
  try {
    return await prisma.notifikasi.count({
      where: { userId, dibaca: false },
    });
  } catch (error) {
    console.error("[notifications] count fallback:", error instanceof Error ? error.message : String(error));
  }

  try {
    const columns = await resolveNotificationColumns();
    if (!columns.has("user_id")) return 0;

    if (columns.has("dibaca")) {
      const rows = await prisma.$queryRawUnsafe<Array<{ total: number }>>(
        "SELECT COUNT(*)::int AS total FROM public.notifikasis WHERE user_id = $1 AND COALESCE(dibaca, false) = false",
        userId.toString(),
      );
      return Number(rows[0]?.total ?? 0);
    }

    const rows = await prisma.$queryRawUnsafe<Array<{ total: number }>>(
      "SELECT COUNT(*)::int AS total FROM public.notifikasis WHERE user_id = $1",
      userId.toString(),
    );
    return Number(rows[0]?.total ?? 0);
  } catch (error) {
    console.error("[notifications] count fallback query failed:", error instanceof Error ? error.message : String(error));
    return 0;
  }
}

export async function safeListNotifications(userId: bigint, limit = 150): Promise<SafeNotification[]> {
  try {
    const rows = await prisma.notifikasi.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: Math.max(1, Math.min(limit, 500)),
    });

    return rows.map((row) => ({
      id: row.id.toString(),
      judul: row.judul,
      pesan: row.pesan,
      tipe: row.tipe ?? null,
      link: row.link ?? null,
      dibaca: Boolean(row.dibaca),
      createdAt: row.createdAt ? row.createdAt.toISOString() : null,
    }));
  } catch (error) {
    console.error("[notifications] list fallback:", error instanceof Error ? error.message : String(error));
  }

  try {
    const columns = await resolveNotificationColumns();
    if (!hasRequiredColumns(columns, ["id", "user_id"])) return [];

    const selects: string[] = [];
    selects.push('id::text AS "id"');
    selects.push(columns.has("judul") ? `COALESCE(judul::text, '') AS "judul"` : `'' AS "judul"`);
    selects.push(columns.has("pesan") ? `COALESCE(pesan::text, '') AS "pesan"` : `'' AS "pesan"`);
    selects.push(columns.has("tipe") ? `tipe::text AS "tipe"` : `NULL::text AS "tipe"`);
    selects.push(columns.has("link") ? `link::text AS "link"` : `NULL::text AS "link"`);
    selects.push(columns.has("dibaca") ? `COALESCE(dibaca, false) AS "dibaca"` : `false AS "dibaca"`);
    selects.push(columns.has("created_at") ? `created_at AS "created_at"` : `NULL::timestamp AS "created_at"`);

    const orderBy = columns.has("created_at") ? "created_at DESC NULLS LAST, id DESC" : "id DESC";
    const safeLimit = Math.max(1, Math.min(limit, 500));
    const sql = `SELECT ${selects.join(", ")} FROM public.notifikasis WHERE user_id = $1 ORDER BY ${orderBy} LIMIT $2`;
    const rows = await prisma.$queryRawUnsafe<NotificationRawRow[]>(sql, userId.toString(), safeLimit);

    return rows.map((row) => ({
      id: row.id,
      judul: row.judul ?? "",
      pesan: row.pesan ?? "",
      tipe: row.tipe ?? null,
      link: row.link ?? null,
      dibaca: Boolean(row.dibaca),
      createdAt: row.created_at ? new Date(row.created_at).toISOString() : null,
    }));
  } catch (error) {
    console.error("[notifications] list fallback query failed:", error instanceof Error ? error.message : String(error));
    return [];
  }
}

export async function safeMarkAllNotificationsRead(userId: bigint): Promise<void> {
  try {
    await prisma.notifikasi.updateMany({
      where: { userId, dibaca: false },
      data: { dibaca: true },
    });
    return;
  } catch (error) {
    console.error("[notifications] mark all fallback:", error instanceof Error ? error.message : String(error));
  }

  try {
    const columns = await resolveNotificationColumns();
    if (!hasRequiredColumns(columns, ["user_id", "dibaca"])) return;
    const setUpdatedAt = columns.has("updated_at") ? ", updated_at = NOW()" : "";
    await prisma.$queryRawUnsafe(
      `UPDATE public.notifikasis SET dibaca = true${setUpdatedAt} WHERE user_id = $1 AND COALESCE(dibaca, false) = false`,
      userId.toString(),
    );
  } catch (error) {
    console.error("[notifications] mark all fallback query failed:", error instanceof Error ? error.message : String(error));
  }
}

export async function safeMarkNotificationRead(userId: bigint, notificationId: bigint): Promise<void> {
  try {
    const notif = await prisma.notifikasi.findFirst({
      where: { id: notificationId, userId },
      select: { id: true },
    });
    if (!notif) return;
    await prisma.notifikasi.update({
      where: { id: notif.id },
      data: { dibaca: true },
    });
    return;
  } catch (error) {
    console.error("[notifications] mark one fallback:", error instanceof Error ? error.message : String(error));
  }

  try {
    const columns = await resolveNotificationColumns();
    if (!hasRequiredColumns(columns, ["id", "user_id", "dibaca"])) return;
    const setUpdatedAt = columns.has("updated_at") ? ", updated_at = NOW()" : "";
    await prisma.$queryRawUnsafe(
      `UPDATE public.notifikasis SET dibaca = true${setUpdatedAt} WHERE id = $1 AND user_id = $2`,
      notificationId.toString(),
      userId.toString(),
    );
  } catch (error) {
    console.error("[notifications] mark one fallback query failed:", error instanceof Error ? error.message : String(error));
  }
}
