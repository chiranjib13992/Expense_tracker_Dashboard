// CrumbsContext.js
import React, { createContext, useState, useContext } from "react";

const CrumbsContext = createContext();

export function CrumbsProvider({ children }) {
  const [crumbs, setCrumbs] = useState(["Home", "Dashboard"]);
  return (
    <CrumbsContext.Provider value={{ crumbs, setCrumbs }}>
      {children}
    </CrumbsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCrumbs() {
  return useContext(CrumbsContext);
}
