import React, { createContext } from "react";

interface userContext {
  token: string;
}

export const userContext = createContext<userContext>(null!);
