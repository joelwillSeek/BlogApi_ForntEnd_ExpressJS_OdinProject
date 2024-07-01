import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { GlobalContextTypes, postReciveTypes } from "./globalSettings";

const GlobalContext = createContext<GlobalContextTypes>(null);

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  let [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
  let [postToBeViewIndividually, setPostToBeViewIndividually] = useState<{
    posts: postReciveTypes | null;
  }>(null);
  let [userName, setUserName] = useState<string | null>(null);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };
  return (
    <GlobalContext.Provider
      value={{
        userName,
        setUserName,
        postToBeViewIndividually: postToBeViewIndividually,
        setPostToBeViewIndividually: setPostToBeViewIndividually,
        isAuthenticated,
        login,
        logout,
        getToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;
