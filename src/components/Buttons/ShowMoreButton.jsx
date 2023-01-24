import React from "react";

const ShowMoreButton = (props) => {
  const onShowMore = props.onShowMore;
  return (
    <button className="showMoreBtn" onClick={onShowMore}>
      Show more
    </button>
  );
};

export default ShowMoreButton;
