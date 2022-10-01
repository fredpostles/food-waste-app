import React from "react";
import { useSelector } from "react-redux";

const Pantry = () => {
  const pantryItems = useSelector((state) => state.data.pantryItems);
  // pantryItems.map((item) => do something)

  return <h1>Pantry</h1>;
};

export default Pantry;
