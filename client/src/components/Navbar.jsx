import { useState } from "react";
import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../../images/logo.png";

const NavbarItem = ({ title, classProps }) => {
  return (
    <li className={`mx-4 cursor-pointer text-white ${classProps}`}>{title}</li>
  );
};

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  return (
    <nav className="w-full flex justify-between items-stretch p-4">
      <div className="flex items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer ml-4" />
      </div>
      <ul className="text-white font-semibold flex list-none flex-wrap items-center">
        {["Markets", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
          <NavbarItem key={item + index} title={item} classProps="mx-4" />
        ))}
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
      </ul>
      <div className="flex relative">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <ul>
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(true)} />
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
