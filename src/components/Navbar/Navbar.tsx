import React from "react";
import "./Navbar.css";

import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../features/themeSlice.ts";
import { RootState } from "../../redux/store";

import { LuSunMedium, LuMoon } from "react-icons/lu";


const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const logoUrl = theme === "light" ? "/assets/logo/logo-full-black.svg" : "/assets/logo/logo-full-white.svg";

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logoUrl} alt="" srcset="" />
      </div>
      <div className="navbar-tools">
        <button
          className="navbar-theme-toggle"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <LuMoon /> : <LuSunMedium />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
