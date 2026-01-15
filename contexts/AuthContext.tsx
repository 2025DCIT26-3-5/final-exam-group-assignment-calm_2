import React, { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  userId: string | null;
  login: (id: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  userId: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);

  const login = (id: string) => setUserId(id);
  const logout = () => setUserId(null);

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
