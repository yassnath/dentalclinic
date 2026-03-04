import { format } from "date-fns";
import { id } from "date-fns/locale";

export function formatDate(value: Date | null | undefined, pattern = "dd-MM-yyyy") {
  if (!value) return "-";
  try {
    return format(value, pattern, { locale: id });
  } catch {
    return "-";
  }
}

export function formatDateTime(value: Date | null | undefined, pattern = "dd-MM-yyyy HH:mm") {
  if (!value) return "-";
  try {
    return format(value, pattern, { locale: id });
  } catch {
    return "-";
  }
}

export function formatCurrency(value: number | string | bigint | null | undefined) {
  const num = typeof value === "bigint" ? Number(value) : Number(value ?? 0);
  return new Intl.NumberFormat("id-ID").format(Number.isFinite(num) ? num : 0);
}

export function toRoleLabel(role: string) {
  if (role === "admin") return "admin";
  if (role === "dokter") return "dokter";
  if (role === "resepsionis") return "resepsionis";
  return "pasien";
}
