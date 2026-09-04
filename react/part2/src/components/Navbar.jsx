import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CourseContext } from "../context/ProductContext";
function Navbar() {
  const { cartCourse, setCartCourse } = useContext(CourseContext);
  console.log("navbar render");
  return (
    <div className="w-full h-[70px] bg-zinc-200 flex items-center justify-between px-20 shadow-xl sticky top-0 z-50 bg-opacity-90">
      <div className="text-2xl font-semibold tracking-wider">
        {" "}
        <Link to="/">Procoder</Link>
      </div>
      <div className="flex gap-10 text-sm font-medium">
        <div className="">
          <Link to="/courses">Courses</Link>
        </div>
        <div className="">
          <Link to="/cart" className="relative text-center">
            Cart
            {cartCourse.length > 0 && (
              <span className="bg-red-700/80 absolute -right-5 -top-2  size-5 rounded-lg left z-50 shadow-xl text-white  text-sm">
                {cartCourse.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
