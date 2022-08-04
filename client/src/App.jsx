import React from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import CharacterDetail from "./components/CharacterDetail/CharacterDetail";
import { Modal } from "./components/Modal/Modal";
import { PagesContextProvider } from "./context/PagesContext";
import { CharactersContextProvider } from "./context/CharactersContext";
import { EpisodesContextProvider } from "./context/EpisodesContext";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const isModal = location.state && location.state.isModal;
  return (
    <div className="App">
      <CharactersContextProvider>
        <PagesContextProvider>
          <EpisodesContextProvider>
            <Routes location={background || isModal || location}>
              <Route exact path="/" element={<Home />} />
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
    </div>
  );
}

export default App;
