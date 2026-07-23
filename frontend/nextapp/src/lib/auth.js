export const ROLES = {
  ADMIN: 1,
  SPONSOR: 2,
  SCHOOL_ADMIN: 3,
};

const STORAGE_KEYS = ["user_id", "role", "email", "accessToken", "school"];

export function setSession({ userId, role, email, accessToken, school }) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("user_id", String(userId));
  window.localStorage.setItem("role", String(role));
  window.localStorage.setItem("email", email ?? "");
  window.localStorage.setItem("accessToken", accessToken);
  window.localStorage.setItem("school", school ?? "");
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
    school: window.localStorage.getItem("school") || null,
  };
}

export function clearSession() {
  if (typeof window === "undefined") return;
  STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
}

export function isAdmin() {
  return getSession()?.role === ROLES.ADMIN;
}

// Site admins and school admins both get the dashboard; the backend scopes
// school admins' data to their school.
export function isStaffAdmin() {
  const role = getSession()?.role;
  return role === ROLES.ADMIN || role === ROLES.SCHOOL_ADMIN;
}
