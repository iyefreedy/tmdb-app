import API from "@/API";
import { LoginCredential } from "@/types";
import { isPersistedState } from "@/utils";
import React, { createContext, useEffect, useState } from "react";

interface User {
  username: string;
  sessionId: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: boolean;
  attemptLogin: (credential: LoginCredential) => Promise<void>;
  attemptLogout: () => Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthState>({
  user: null,
  loading: false,
  error: false,
  attemptLogin: async () => {},
  attemptLogout: async () => {},
});

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const userSession = isPersistedState<User>("user");

    setUser(userSession);
  }, []);

  const attemptLogin = async (credential: LoginCredential) => {
    try {
      setLoading(true);
      setError(false);

      const requestToken = await API.fetchRequestToken();
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

  const attemptLogout = async () => {
    try {
      setLoading(true);
      setError(false);

      const sessionUser = isPersistedState<User>("user");
      await API.logout(sessionUser?.sessionId);

      sessionStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, attemptLogin, attemptLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
