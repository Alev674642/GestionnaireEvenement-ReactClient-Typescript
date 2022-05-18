import React, { useState, createContext } from "react";

export const sortieContext = createContext();

export default function SortieProvider({ children }) {
  const [sortiesContext, setSortiesContext] = useState([]);
  const [sortieEnModification, setSortieEnModification] = useState({});

  return (
    <sortieContext.Provider
      value={{
        sortiesContext,
        setSortiesContext,
        sortieEnModification,
        setSortieEnModification,
      }}>
      {children}
    </sortieContext.Provider>
  );
}
