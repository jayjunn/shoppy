import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChange } from "../utils/firebase";
import { login, logout } from "../utils/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChange(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
