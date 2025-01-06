import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import LoginPage from "../pages/globals/LoginPage/LoginPage";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/user/currentUser",
        {
          withCredentials: true,
        }
      );
      //console.log(response.data.data);
      setUser(response.data.data);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      console.log("Error from context");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      setIsAuthenticated(false);
      navigate("/",{replace:true})
    } catch (error) {
      console.error("Error during logout`:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, logout, loading, user, fetchCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};
export { AuthProvider, useAuth };
