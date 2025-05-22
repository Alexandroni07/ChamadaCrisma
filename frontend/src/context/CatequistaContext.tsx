import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Catequista, CatequistaContextType } from './Types';
import { buscarChamada } from '../Pages/services';

const CatequistaContext = createContext<CatequistaContextType>({
  catequista: null,
  setCatequista: () => {},
});

export const CatequistaProvider = ({ children }: { children: ReactNode }) => {
  const [catequista, setCatequista] = useState<Catequista | null>(null);

  return (
    <CatequistaContext.Provider value={{ catequista, setCatequista }}>
      {children}
    </CatequistaContext.Provider>
  );
};

export const useCatequista = () => useContext(CatequistaContext);
