import React, { useState, useEffect } from "react";
import Startup from "./components/Startup";
import Interface from "./components/Interface";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/generics.css";
import "./App.css";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  return (
    <Router>
      <button onClick={() => localStorage.clear()}>Clear localStorage</button>
      <Routes>
        {isLoaded ? (
          <Route path="/*" element={<Interface />} />
        ) : (
          <Route path="/*" element={<Startup />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
