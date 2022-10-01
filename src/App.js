import React from "react";
import Interface from "./components/Interface";

const App = () => {
  return (
    <>
      <button onClick={() => localStorage.clear()}>Clear localStorage</button>
      <Interface />
    </>
  );
};

export default App;
