export function toPlainObject<T>(value: T): T {
  return JSON.parse(
    JSON.stringify(value, (_, val) => {
      if (typeof val === "bigint") {
        return val.toString();
      }
      if (val instanceof Date) {
        return val.toISOString();
      }
      return val;
    }),
  ) as T;
}
