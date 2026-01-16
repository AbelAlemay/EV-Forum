import { createContext, useContext, useEffect, useMemo, useState } from "react";
import client from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { userid, username }
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const { data } = await client.get("/user/checkUser");
      setUser({ userid: data.userid, username: data.username });
    } catch (e) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshUser();
  }, []);

  async function login(email, password) {
    const { data } = await client.post("/user/login", { email, password });
    localStorage.setItem("token", data.token);
    await refreshUser();
    return data;
  }

  async function register(payload) {
    return client.post("/user/register", payload);
  }

  async function forgotPassword(email) {
    return client.post("/user/forgot-password", { email });
  }

  async function resetPassword(token, newPassword) {
    return client.post("/user/reset-password", { token, newPassword });
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      refreshUser,
      forgotPassword,
      resetPassword,
    }),
    [user, loading]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
