export function isAdmin() {
    if (typeof window === "undefined") return false;
    const user = JSON.parse(localStorage.getItem("admin"));
    return user?.role === "admin";
  }
  