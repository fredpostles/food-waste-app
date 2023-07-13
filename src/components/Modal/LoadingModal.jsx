import React from "react";

const LoadingModal = () => {
  return (
    <div className="modalBackground">
      <div
        className="modalContainer"
        style={{
          backgroundColor: "white",
          width: "24rem",
          height: "20rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="modalHeader">
          <h1 style={{ margin: "0 auto 2.5rem" }}>Loading...</h1>
        </div>
        <div className="modalBody">
          <img
            loading="lazy"
            src="/assets/gifs/icons8-loading-circle.gif"
            alt="Loading spinner"
          />
        </div>
        <div className="modalFooter"></div>
      </div>
    </div>
  );
};

export default LoadingModal;
