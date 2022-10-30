import { onAuthStateChanged } from 'firebase/auth';
import { Children, createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/client';

type ContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<ContextType>({
  isLoggedIn: false,
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const userAuth = () => useContext(AuthContext);
