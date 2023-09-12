import { createContext, useState, useContext } from "react";

type AuthContextTypes = {
    token: string | null,
    setToken: (value: any) => void
}

const AuthContext = createContext<AuthContextTypes>({
  token: null,
  setToken: () => {},
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, _setToken] = useState(JSON.parse(localStorage.getItem('auth')!))

    const setToken = (value: any) => {
        localStorage.setItem('auth', JSON.stringify(value))
        _setToken(value)
    }

  return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext)