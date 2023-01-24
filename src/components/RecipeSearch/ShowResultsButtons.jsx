import React from "react";
import ShowLessButton from "../Buttons/ShowLessButton";
import ShowMoreButton from "../Buttons/ShowMoreButton";

const ShowResultsButtons = (props) => {
  const { suggestions, ingredientSearch, showMore, onShowMore, onShowLess } =
    props;
  return (
    <div className="showResults__container">
      {((suggestions && suggestions.length > showMore) ||
        (ingredientSearch && ingredientSearch.length > showMore)) && (
        <ShowMoreButton onShowMore={onShowMore} />
      )}
      {showMore >= 21 && <ShowLessButton onShowLess={onShowLess} />}
    </div>
  );
};

export default ShowResultsButtons;
