import {
    createContext,
    useContext,
    useState,
} from 'react';

import type {
    ReactNode,
} from 'react';

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;

  login: (
    email: string,
    password: string
  ) => boolean;

  signup: (
    name: string,
    email: string,
    password: string
  ) => boolean;

  logout: () => void;

  updateName: (
    name: string
  ) => void;
};

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<User | null>(null);

  function login(
    email: string,
    password: string
  ): boolean {
    if (
      !email.trim() ||
      !password.trim()
    ) {
      return false;
    }

    const nameFromEmail =
      email.split('@')[0] || 'Student';

    setUser({
      name: nameFromEmail,
      email,
    });

    return true;
  }

  function signup(
    name: string,
    email: string,
    password: string
  ): boolean {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      return false;
    }

    setUser({
      name: name.trim(),
      email: email.trim(),
    });

    return true;
  }

  function logout() {
    setUser(null);
  }

  function updateName(
    name: string
  ) {
    if (!name.trim()) {
      return;
    }

    setUser((currentUser) => {
      if (!currentUser) {
        return null;
      }

      return {
        ...currentUser,
        name: name.trim(),
      };
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    );
  }

  return context;
}