export type AppError = {
  message: string;
  code?: string;
};

export const createError = (message: string, code?: string): AppError => ({
  message,
  code,
});

export const normalizeError = (error: unknown): AppError => {
  if (error instanceof Error) {
    return { message: error.message };
  }

  if (typeof error === "string") {
    return { message: error };
  }

  return { message: "Something went wrong. Please try again." };
};
