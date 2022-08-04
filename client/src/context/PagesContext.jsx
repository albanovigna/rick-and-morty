import React, { useState } from "react";

const Context = React.createContext({});

export function PagesContextProvider({ children }) {
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <Context.Provider value={{ pageNumber, setPageNumber }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
