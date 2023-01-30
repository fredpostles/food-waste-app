import React from "react";

const PantrySortSelection = ({ filterChange }) => {
  return (
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
  );
};

export default PantrySortSelection;
