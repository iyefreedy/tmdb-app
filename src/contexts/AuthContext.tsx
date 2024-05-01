import API from "@/API";
import { LoginCredential } from "@/types";
import { isPersistedState } from "@/utils";
import React, { createContext, useEffect, useState } from "react";

interface User {
  username: string;
  sessionId: string;
}

interface AuthState {
  user: User | undefined;
  loading: boolean;
  error: boolean;
  attemptLogin: (credential: LoginCredential) => Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthState>({
  user: undefined,
  loading: false,
  error: false,
  attemptLogin: async () => {},
});

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const userSession = isPersistedState<User>("user");

    if (userSession) {
      setUser(userSession);
    }
  }, []);

  const attemptLogin = async (credential: LoginCredential) => {
    setLoading(true);
    try {
      const requestToken = await API.getRequestToken();
      const sessionId = await API.login(credential, requestToken);

      const user: User = {
        sessionId: sessionId.session_id,
        username: credential.username,
      };

      sessionStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, attemptLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
