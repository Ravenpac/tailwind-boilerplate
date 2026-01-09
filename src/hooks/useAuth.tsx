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
  acceptedTerms: boolean;
  acceptedDate: string;
}

interface IUserProvider {
  user: User;
  setUser: React.Dispatch<SetStateAction<User>>;
  isAuthenticated: boolean;
  logout: () => void;
  isLoading: boolean;
}

interface ChildrenProps {
  children: ReactNode;
}

const AuthContext = createContext({} as IUserProvider);

const AuthProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dataUser = localStorage.getItem('@Placeholder:user');

    if (dataUser) {
      try {
        const parsedUser = JSON.parse(dataUser);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem('@Placeholder:user');
      }
    }

    setIsLoading(false);
  }, []);

  const isAuthenticated = user.id !== undefined;

  const logout = async () => {
    localStorage.clear();
    setUser({} as User);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
