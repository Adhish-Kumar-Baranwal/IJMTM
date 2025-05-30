import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(null); 

  // login expects userType string directly now
  const login = (type) => setUserType(type);
 const logout = () => {
  setUserType(null); // or setUser(null), depending on your logic
  localStorage.removeItem("token"); // if you're using tokens
};

  return (
    <AuthContext.Provider value={{ userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
