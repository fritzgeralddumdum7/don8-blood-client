import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (user, authorization) => {
    setUser(user);
    const cookieObj = { access_token: authorization, user }
    Cookies.set('don8_blood', JSON.stringify(cookieObj), { expires: 1 });
  };

  const logout = async () => {
    setUser(null);
    Cookies.remove('don8_blood');
  }

  useEffect(() => {
    const data = Cookies.get('don8_blood');
    if (data) {
      setUser(JSON.parse(data).user);
    }
  }, [])

  const stateValues = {
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={stateValues}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}
