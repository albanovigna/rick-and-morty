import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CharacterDetail from "./components/CharacterDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </div>
  );
}

export default App;
