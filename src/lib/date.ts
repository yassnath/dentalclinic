const DAYS_ID = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

export function toHariIndonesia(dateYmd: string) {
  const date = new Date(`${dateYmd}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return DAYS_ID[date.getDay()] ?? "";
}

export function toDateInputValue(date?: Date | null) {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
