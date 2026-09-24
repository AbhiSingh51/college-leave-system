import { createContext, useContext, useState, useCallback } from "react";
import { findUserById, ROLES } from "../data/mockData";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback((idOrEmail) => {
    const trimmed = String(idOrEmail || "").trim();
    const found = findUserById(trimmed);
    const sessionUser =
      found ||
      {
        id: trimmed || "STU0000",
        role: ROLES.STUDENT,
        name: trimmed ? trimmed : "Guest Student",
        department: "Computer Science",
        semester: "5th",
        section: "B",
      };
    setUser(sessionUser);
    return sessionUser;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
