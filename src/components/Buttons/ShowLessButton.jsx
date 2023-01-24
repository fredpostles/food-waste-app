import React from "react";

const ShowLessButton = (props) => {
  const onShowLess = props.onShowLess;
  return (
    <button className="showLessBtn" onClick={onShowLess}>
      Show less
    </button>
  );
};

export default ShowLessButton;
