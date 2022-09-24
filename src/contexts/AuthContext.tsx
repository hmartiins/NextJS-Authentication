import { createContext, useState } from "react";
import { signInRequest } from "../services/auth";

import Router from 'next/router';

import { setCookie } from 'nookies';

type SignInData = {
  email: string;
  password: string;
};

type User = {
  name: string;
  email: string;
  avatar_url: string;
}

type AuthContextType = {
  user: User,
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null); 

  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInData) {
    const { token, user } = await signInRequest({
      email,
      password
    });

    setCookie(undefined, 'nextauth-token', token, {
      maxAge: 60 * 60 * 1 // 1hour
    });

    setUser(user);
    Router.push('/dashboard');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn}}>
      {children}
    </AuthContext.Provider>
  );
}