export const setTokenClient = (token: string) => {
  if (typeof document === "undefined") return;

  const maxAge = 60 * 60; // 1h
  document.cookie = `token=${token}; path=/; max-age=${maxAge}; samesite=lax`;
};

export const getTokenClient = () => {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(/(^| )token=([^;]+)/);
  return match ? match[2] : null;
};

export const clearTokenClient = () => {
  if (typeof document === "undefined") return;

  document.cookie = "token=; path=/; max-age=0; samesite=lax";
};
