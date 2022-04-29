import React from "react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
// import PropTypes from "prop-types";
const Navbar = ({ title }) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };
  return (
    <nav className="sticky navbar mb-12 shadow-lg bg-neutral text-neutral-content flex flex-wrap w-full p-3">
      <div className="px-2 mx-2 align-middle inline-flex items-center font-bold text-lg">
        <Link href="/" className="">
          <a className="hover:cursor-pointer">
            <FaGithub className="inline pr-2 text-3xl" />
            {title}
          </a>
        </Link>
      </div>
      <button
        className="p-3 hover:bg-blue-600 rounded lg:hidden text-black ml-auto outline-none"
        onClick={handleClick}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div
        className={`${
          active ? "" : "hidden"
        } w-full lg:inline-flex lg:flex-grow lg:w-auto`}
      >
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
          <Link href="/">
            <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded font-bold items-center justify-center hover:bg-gray-600 hover:text-white ">
              Home
            </a>
          </Link>
          <Link href="/">
            <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded font-bold items-center justify-center hover:bg-gray-600 hover:text-white ">
              about
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
