import React, { useContext, useEffect, useState } from "react";
import proudcts from "../../public/Product";
import { ShoppingCart } from "lucide-react";
import { CourseContext } from "../context/ProductContext";
import axiosInstance from "../utils/axios";
// import axios from "axios";
function Product() {
  const { cartCourse, setCartCourse } = useContext(CourseContext);
  const [courseData, setCourseData] = useState([]);
  function addCartCourse(courseId) {
    setCartCourse((prev) => [...prev, courseId]);
  }
  const getCourseData = async () => {
    try {
      const { data } = await axiosInstance.get("/courses");
      console.log(data);
      setCourseData(data.data);
    } catch (e) {
      throw e;
    }
  };
  useEffect(() => {
    // console.log("product mount");
    getCourseData();

    return () => {
      console.log("product unmount");
    };
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh-70px)] py-5 px-20 bg-gray-100">
      <div className="text-2xl font-semibold ">Popular Courses</div>
      <div className="mt-6 flex flex-wrap gap-6 justify-between">
        {courseData.map((product) => {
          return (
            <div
              className="rounded-md max-w-60 h-50 bg-zinc-100 shadow-xl rounded-lg overflow-hidden"
              key={product._id}
            >
              <div className="image">
                <img
                  src="https://procodrr.com/assets/images/backend%20with%20nodejs.webp"
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="px-4 py-3 bg-zinc-200 flex justify-between items-center  ">
                <div className="">
                  <p className="text-sm font-semibold ">Learn {product.name}</p>
                  <strong>&#8377; {product.price}</strong>
                </div>
                <div
                  className="size-9 hover:bg-black hover:text-white text-black  bg-white text-center rounded-full flex items-center justify-center shadow-2xl  hover:duration-300"
                  onClick={() => addCartCourse(product._id)}
                >
                  <ShoppingCart size={18} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Product;

// | Concept              | Meaning                                                                  |
// | -------------------- | ------------------------------------------------------------------------ |
// | **Event Bubbling**   | Event child → parent ki taraf travel karta hai                           |
// | **Event Delegation** | Bubbling ka use karke parent se multiple children ke events handle karna |
