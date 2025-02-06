import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Ajusta la ruta según tu estructura

const RutaProtegida = (prop) => {
  const { children } = prop

  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default RutaProtegida;