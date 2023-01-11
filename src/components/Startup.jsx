import React from "react";

const Startup = () => {
  return (
    <>
      <div className="startup__container">
        <h1>Make Food, Not Waste!</h1>
        <img
          className="appLogo"
          src="./assets/icons/16245.png"
          alt="Chopped vegetables scattered in the air"
        />
        <h2>Loading...</h2>
        <small>&copy; Fred Postles {new Date().getFullYear()}</small>
      </div>
    </>
  );
};

export default Startup;
