import React, { createContext, useContext } from "react";

interface MyContextType {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

export default MyContext;
