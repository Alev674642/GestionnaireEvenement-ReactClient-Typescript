import React, { useState, createContext } from "react";
import Isortie from "../types/ISortie";

interface ISortieContext {
  sortiesContext : Isortie[],
  setSortiesContext : React.Dispatch<React.SetStateAction<Isortie[]>>,
  sortieEnModification : Isortie|null,
  setSortieEnModification : React.Dispatch<React.SetStateAction<Isortie | null>>,
}

interface Iprops {
  children : React.ReactNode;
}

export const sortieContext = createContext<ISortieContext>({} as ISortieContext);

export default function SortieProvider({children}: Iprops) {
  const [sortiesContext, setSortiesContext] = useState<Isortie[]>([]);
  const [sortieEnModification, setSortieEnModification] = useState<Isortie|null>(null);

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
