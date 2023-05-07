import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const activeLinkClass = "activePage";
  const inactiveLinkClass = "inactivePage";

  return (
    <nav className="mainNav">
      <Link
        to="/pantry"
        className={
          location.pathname === "/pantry" ? activeLinkClass : inactiveLinkClass
        }
      >
        Pantry
      </Link>
      <Link
        to="/recipe-search"
        className={
          location.pathname === "/recipe-search"
            ? activeLinkClass
            : inactiveLinkClass
        }
      >
        Recipe Search
      </Link>
      <Link
        to="/saved-recipes"
        className={
          location.pathname === "/saved-recipes"
            ? activeLinkClass
            : inactiveLinkClass
        }
      >
        Saved Recipes
      </Link>
      <Link
        to="/account"
        className={
          location.pathname === "/account" ? activeLinkClass : inactiveLinkClass
        }
      >
        Account
      </Link>
    </nav>
  );
};

export default Navigation;
