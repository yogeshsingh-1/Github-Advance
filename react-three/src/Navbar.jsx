import React, { useState } from "react";
// import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItems = ["Home", "About", "Service", "Contact"];

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-[10vh] flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-wide text-gray-800 cursor-pointer">
            Logo
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-10">
            {navItems.map((item, index) => (
              <button
                key={index}
                className="relative text-gray-700 font-medium hover:text-black transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden text-gray-800"
            onClick={() => setOpen(!open)}
          >
            {open ? "#" : "*"}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-[75%] max-w-[300px] bg-white z-40 shadow-2xl transform transition-transform duration-500 ease-in-out sm:hidden text-center
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="pt-28 px-8 flex flex-col gap-8">
          {navItems.map((item, index) => (
            <button
              key={index}
              className="text-left text-2xl font-semibold text-gray-700 hover:text-black transition"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
