/* eslint-disable react/jsx-no-constructed-context-values */

'use client';

import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface IResponseLogin {
  jwt: string;
  refreshToken: string;
  user: User;
}

export interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  rejectionReason: string;
}

interface IUserProvider {
  user: User;
  setUser: React.Dispatch<SetStateAction<User>>;
  isAuthenticated: boolean;
  logout: () => void;
}

interface ChildrenProps {
  children: ReactNode;
}

const AuthContext = createContext({} as IUserProvider);

const AuthProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataUser = localStorage.getItem('@Placeholder:user');

    if (dataUser) {
      const parsedUser = JSON.parse(dataUser);

      setUser(parsedUser);
    }

    setLoading(false);
  }, []);

  const isAuthenticated = user.id !== undefined;

  const logout = async () => {
    localStorage.clear();
    setUser({} as User);
  };

  if (loading) {
    return null;
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
