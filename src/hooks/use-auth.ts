export const useAuth = () => {
  const login = () => {
    console.log("Login");
    localStorage.setItem("isAuthenticated", "true");
  };
  const logout = () => {
    console.log("Logout");
    localStorage.removeItem("isAuthenticated");
  };

  const isAuthenticated = () => {
    console.log("isAuthenticated", localStorage.getItem("isAuthenticated"));
    return localStorage.getItem("isAuthenticated") === "true";
  };

  return { isAuthenticated, login, logout };
};

export type AuthContext = ReturnType<typeof useAuth>;
