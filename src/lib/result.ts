export type ServiceResult<T> = {
  data: T;
  error?: string;
};

export const wait = (ms = 80): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function ok<T>(data: T): ServiceResult<T> {
  return { data };
}

export function fail<T>(error: string, data: T): ServiceResult<T> {
  return { data, error };
}
