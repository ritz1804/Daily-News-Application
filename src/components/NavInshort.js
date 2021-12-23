import React from "react";
import "./NavInshort.css";
import HamburgerDrawer from "./HamburgerDrawer";

const NavInshort = ({ setCategory }) => {
  return (
    <div className="nav">
      <div className="menu">
        <HamburgerDrawer setCategory={setCategory} />
      </div>

      <h1>Daily News</h1>
    </div>
  );
};

export default NavInshort;
