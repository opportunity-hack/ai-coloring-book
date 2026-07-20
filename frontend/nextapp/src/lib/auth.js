export const ROLES = {
  ADMIN: 1,
  SPONSOR: 2,
};

const STORAGE_KEYS = ["user_id", "role", "email", "accessToken"];

export function setSession({ userId, role, email, accessToken }) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("user_id", String(userId));
  window.localStorage.setItem("role", String(role));
  window.localStorage.setItem("email", email ?? "");
  window.localStorage.setItem("accessToken", accessToken);
}

export function getSession() {
  if (typeof window === "undefined") return null;
  const accessToken = window.localStorage.getItem("accessToken");
  if (!accessToken) return null;
  return {
    userId: window.localStorage.getItem("user_id"),
    role: Number(window.localStorage.getItem("role")),
    email: window.localStorage.getItem("email"),
    accessToken,
  };
}

export function clearSession() {
  if (typeof window === "undefined") return;
  STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
}

export function isAdmin() {
  return getSession()?.role === ROLES.ADMIN;
}
