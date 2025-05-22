import { createContext, useContext, useState, ReactNode } from 'react';
import { Catequista, CatequistaContextType } from './Types';

const CatequistaContext = createContext<CatequistaContextType>({
  catequista: null,
  setCatequista: () => {},
});

export const CatequistaProvider = ({ children }: { children: ReactNode }) => {
  const [catequista, setCatequista] = useState<Catequista | null>(null);
console.log(catequista)
  return (
    <CatequistaContext.Provider value={{ catequista, setCatequista }}>
      {children}
    </CatequistaContext.Provider>
  );
};

export const useCatequista = () => useContext(CatequistaContext);
