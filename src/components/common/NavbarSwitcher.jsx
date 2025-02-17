import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import HomeNavbar from "./HomeNavbar";

const NavbarSwitcher = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return isHomePage ? <HomeNavbar /> : <Navbar />;
};

export default NavbarSwitcher;
