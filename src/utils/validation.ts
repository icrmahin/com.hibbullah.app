export const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const isValidPhone = (value: string): boolean =>
  /^(\+?254|0)[17][0-9]{8}$/.test(value.replace(/\s+/g, ""));

export const isEmpty = (value?: string | null): boolean =>
  !value || !value.trim();
