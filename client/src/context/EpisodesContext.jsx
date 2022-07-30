import React, { useState } from "react";

const Context = React.createContext({});

export function EpisodesContextProvider({ children }) {
  const [episodes, setEpisodes] = useState([]);

  return (
    <Context.Provider value={{ episodes, setEpisodes }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
