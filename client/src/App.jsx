import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import CharacterDetail from "./components/CharacterDetail/CharacterDetail";
import EpisodesModal from "./components/EpisodesModal/EpisodesModal";
import { Modal } from "./components/Modal/Modal";
import { PagesContextProvider } from "./context/PagesContext";
import { CharactersContextProvider } from "./context/CharactersContext";
import { EpisodesContextProvider } from "./context/EpisodesContext";

// const PagesContext = React.createContext(1);

function App() {
  // const [pageNumber, setPageNumber] = useState(1);
  const location = useLocation();
  const background = location.state && location.state.background;
  const isModal = location.state && location.state.isModal;
  return (
    <div className="App">
      {/* <PagesContext.Provider value={{ pageNumber, setPageNumber }}> */}
      <CharactersContextProvider>
        <PagesContextProvider>
          <EpisodesContextProvider>
            <Routes location={background || isModal || location}>
              <Route exact path="/" element={<Home />} />
              {/* <Route exact path="/character/:id" element={<CharacterDetail />}>
              </Route> */}
            </Routes>
            {background && (
              <Routes>
                <Route path="episodes" element={<Modal />} />
              </Routes>
            )}
            {isModal && (
              <Routes>
                <Route
                  exact
                  path="character/:id"
                  element={<CharacterDetail />}
                />
              </Routes>
            )}
          </EpisodesContextProvider>
        </PagesContextProvider>
      </CharactersContextProvider>
      {/* </PagesContext.Provider> */}
    </div>
  );
}

export default App;
