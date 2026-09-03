export const formatDate = (
  value: string | Date,
  options?: Intl.DateTimeFormatOptions,
): string => {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...options,
  }).format(date);
};

export const formatShortDate = (value: string | Date): string =>
  formatDate(value, { month: "short", day: "numeric" });

export const formatDateTime = (value: string | Date): string =>
  new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(typeof value === "string" ? new Date(value) : value);
