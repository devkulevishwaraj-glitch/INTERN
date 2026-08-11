import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  // ==========================================
  // LOGIN
  // ==========================================

  const login = async (email, password) => {
    const res = await loginUser({
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));

    setUser(res.data);

    return res.data;
  };

  // ==========================================
  // REGISTER
  // ==========================================

  const register = async (registrationData) => {
    console.log("Registration data:", registrationData);

    const res = await registerUser(registrationData);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));

    setUser(res.data);

    return res.data;
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}