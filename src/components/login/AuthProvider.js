import React, { useState } from "react";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  let [user, setUser] = useState("");
  let [token, setToken] = useState("");
  let [pseudo, setPseudo] = useState("");

  let signin = (newUser, token, pseudo, callback) => {
    setUser(newUser);
    setToken(token);
    setPseudo(pseudo);
    return callback();
  };

  let signout = (callback) => {
    setUser(null);
    setToken(null);
    setPseudo(null);
    return callback();
  };

  let value = { user, token, pseudo, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
