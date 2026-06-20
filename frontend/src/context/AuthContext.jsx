import { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../services/apiClient';

const API_URL = '/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On page load (or refresh), ask the backend: "Am I still logged in?"
  // The HTTP-only cookie is automatically sent with the request.
  // If the cookie has a valid JWT, the backend returns the user data.
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiClient.get(`${API_URL}/me`);
        setUser(response.data.data);
      } catch (error) {
        // Cookie expired or doesn't exist — user is not logged in
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const loginWithGoogle = async (accessToken) => {
    try {
      const response = await apiClient.post(
        `${API_URL}/login`,
        { googleToken: accessToken }
      );
      setUser(response.data.data.user);
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
    }
  };

  const logout = async () => {
    try {
      await apiClient.post(`${API_URL}/logout`, {});
    } catch (error) {
      console.error('Logout failed:', error);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};