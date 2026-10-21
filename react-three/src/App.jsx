import React, { useCallback, useEffect, useState } from "react";
import Navbar from "./Navbar";
const App = () => {
  // const open = useRef(false);
  const [open, setOpen] = useState(false);
  // useEffect(() => {
  useEffect(() => {
    const id = setInterval(() => {
      setOpen((prev) => !prev);
    }, 1000);

    return () => clearInterval(id);
  }, []);
  // return () => clearInterval(interval);
  // }, [open]);
  // setInterval(() => setOpen((prev)=>!prev), 1000);
  // setInterval(() => setOpen(!open), 1000);
  // setInterval(() => setOpen(!open), 1000)
  return (
    <>
      <div className="px-8 py-2">
        <button
          className="bg-radial from-green-600  via-green-400 to-green-900 size-20 rounded shadow-md text-black/80 font-semibold text-xs cursor-pointer hover:bg-linear-to-r hover:from-blue-400 hover:via-blue-700 hover:to-blue-400 transition delay-500 ease-in-out"
          onClick={() => setOpen(!open)}
        >
          ShowMe
        </button>
      </div>
      <div className="w-full h-screen flex justify-center items-center ">
        <div
          className={`size-1/4 border  flex items-center z-50  transation duration-700 ease-in-outshadow-lg   ${open ? " -translate-x-[10]  " : "translate-x-[10%]  "}`}
        >
          <div
            className={`w-full h-full flex items-center -translate-x-full  transation duration-700 ease-in-out bg-cyan-200
              ${open ? " translate-x-0 " : "-translate-x-full "}       
                    `}
          >
            <div className="w-[20vw] h-full bg-cyan-200 rounded-full  backdrop-blur-lg"></div>
            <div className="w-[55vw] h-1/2 bg-cyan-200 rounded-r-[50px]  backdrop-blur-lg"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
