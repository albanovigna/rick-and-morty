import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CharacterDetail from "./components/CharacterDetail";
import EpisodesModal from "./components/EpisodesModal/EpisodesModal";
import { PagesContextProvider } from "./context/PagesContext";

// const PagesContext = React.createContext(1);

function App() {
  // const [pageNumber, setPageNumber] = useState(1);
  return (
    <div className="App">
      {/* <PagesContext.Provider value={{ pageNumber, setPageNumber }}> */}
      <PagesContextProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/character/:id" element={<CharacterDetail />} />
          <Route
            exact
            path="/character/episodes/:id"
            element={<EpisodesModal />}
          />
        </Routes>
      </PagesContextProvider>
      {/* </PagesContext.Provider> */}
    </div>
  );
}

export default App;
