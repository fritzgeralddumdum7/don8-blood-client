import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children, authUser }) => {
  const [user, setUser] = useState(authUser);

  const login = async (user, authorization) => {
    setUser(user);
    const cookieObj = {
      access_token: authorization,
      user: { ...user, role: 2 }
    }
    Cookies.set('don8_blood', JSON.stringify(cookieObj), { expires: 1 });
  };

  const logout = async () => {
    setUser(null);
    Cookies.remove('don8_blood');
  }

  useEffect(() => setUser(authUser));

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
