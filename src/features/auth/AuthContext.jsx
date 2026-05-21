import { createContext, useState, useEffect } from "react";
import { getFromStorage, saveToStorage, removeFromStorage } from "../../utils/storage";
import { loginUser, registerUser } from "./authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getFromStorage("user");
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  const login = async (data) => {
    const res = await loginUser(data);
    setUser(res.user);
    saveToStorage("user", res.user);
    saveToStorage("token", res.token);
    return res;
  };

  const register = async (data) => {
    const res = await registerUser(data);
    setUser(res.user);
    saveToStorage("user", res.user);
    saveToStorage("token", res.token);
    return res;
  };

  const logout = () => {
    setUser(null);
    removeFromStorage("user");
    removeFromStorage("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};