import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = (prop) => {
  const { children } = prop
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('autenticado')
    return storedAuth ? JSON.parse(storedAuth) : false
  });

  useEffect(() => {
    localStorage.setItem('autenticado', JSON.stringify(isAuthenticated))
  }, [isAuthenticated]) 
  
  const login = () => {
    setIsAuthenticated(true);
    //localStorage.setItem('autenticado', JSON.stringify(true));
  }
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('autenticado');

  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);