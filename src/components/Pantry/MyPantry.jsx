import React, { useState } from "react";
import { useSelector } from "react-redux";
import PantryItem from "./PantryItem";

const MyPantry = (setSuggestions) => {
  const pantryItems = useSelector((state) => state.pantryItems);

  const filterChange = (e) => {
    setSort(e.target.value);
  };

  const [sort, setSort] = useState("");

  let sortedData = [...pantryItems];

  if (sort) {
    switch (sort) {
      case "azSort":
        sortedData.sort((a, b) => {
          return a.itemName > b.itemName;
        });
        break;

      case "zaSort":
        sortedData.reverse();
        break;

      case "sortDateAsc":
        sortedData.sort(function (a, b) {
          return b.dateAdded - a.dateAdded;
        });
        break;

      case "sortDateDesc":
        sortedData.sort(function (a, b) {
          return a.dateAdded - b.dateAdded;
        });
        break;

      case "default":
        sortedData = [...pantryItems];
        break;

      default:
        break;
    }
  }

  return (
    <div className="myPantry__container">
      <h3>My Pantry Items:</h3>
      {pantryItems.length > 1 && (
        <label className="pantrySort__label" htmlFor="sortPantryItems">
          Sort by:{" "}
          <select
            name="sortPantryItems"
            id="sortPantryItems"
            onChange={filterChange}
          >
            <option value="default">Default</option>
            <option value="azSort">A-Z</option>
            <option value="zaSort">Z-A</option>
            <option value="sortDateAsc">Newest first</option>
            <option value="sortDateDesc">Oldest first</option>
          </select>
        </label>
      )}
      <div className="pantryItems__container">
        {sortedData &&
          sortedData.map((item) => {
            return (
              <PantryItem
                item={item}
                setSuggestions={setSuggestions}
                key={item.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MyPantry;
