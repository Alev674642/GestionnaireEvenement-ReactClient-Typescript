import React, { useState, createContext } from "react";
import Isortie from "../types/Isortie";

interface ISortieContext {
  sortiesContext : Isortie[],
  setSortiesContext : React.Dispatch<React.SetStateAction<Isortie[]>>,
  sortieEnModification : Isortie|null,
  setSortieEnModification : React.Dispatch<React.SetStateAction<Isortie | null>>,
}

interface Iprops {
  children : React.ReactNode;
}

let initialSortieContext = {
  sortiesContext : [],
  setSortiesContext : null,
  sortieEnModification : null,
  setSortieEnModification :null,
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
