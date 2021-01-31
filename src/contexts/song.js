import { createContext } from "react";
export const songContext = createContext(null);
export const SongProvider = ({ value, children }) => (
  <songContext.Provider value={value}>{children}</songContext.Provider>
);
