import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Startup from "./components/Startup";
import Interface from "./components/Interface";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/generics.css";
import "./App.css";
import { getUser } from "./apiCalls/backendAPI";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState({});
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser(token);
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
      setIsLoaded(true);
    };

    fetchUserData();
    console.log("fetchUserData ran in App");
  }, [token]);

  return (
    <Router>
      <button onClick={() => localStorage.clear()}>Clear localStorage</button>
      <Routes>
        {isLoaded ? (
          <Route path="/*" element={<Interface user={user} />} />
        ) : (
          <Route path="/*" element={<Startup />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
