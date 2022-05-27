import React, { useState } from "react";
import { string } from "yup";

interface AuthContext{
  user: string,
  token: string,
  pseudo:string,
  signin: (newUser:string, token: string, pseudo: string, callback: ()=>any )=>any,
  signout: (callback : ()=>any)=>any
}

interface Props{
  children: JSX.Element
}

export const AuthContext = React.createContext<AuthContext>({} as AuthContext);

export default function AuthProvider({ children }: Props) {
  let [user, setUser] = useState<string>("");
  let [token, setToken] = useState<string>("");
  let [pseudo, setPseudo] = useState<string>("");

  let signin = (newUser:string, token: string, pseudo: string, callback: ()=>any ) => {
    setUser(newUser);
    setToken(token);
    setPseudo(pseudo);
    return callback();
  };

  let signout = (callback : ()=>any) => {
    setUser("");
    setToken("");
    setPseudo("");
    return callback();
  };

  let value = { user, token, pseudo, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
