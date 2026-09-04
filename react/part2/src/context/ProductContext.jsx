import { createContext } from "react";
import { useState } from "react";
// Context create karo
export const CourseContext = createContext(null);

// Provider banao

const CourseProvider = ({ children }) => {
  const [cartCourse, setCartCourse] = useState([]);
  console.log("context render");
  return (
    <CourseContext.Provider value={{ cartCourse, setCartCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export default CourseProvider;
