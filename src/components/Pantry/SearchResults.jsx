import React from "react";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import { getItem } from "../../localStorage";

const SearchResult = ({ addInventoryItem, item }) => {
  return (
    <>
      <ul>
        <li onClick={() => addInventoryItem(item)}>{item.name}</li>
      </ul>
    </>
  );
};

export default SearchResult;
