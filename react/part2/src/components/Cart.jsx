import React, { useContext, useState, useEffect } from "react";
import proudcts from "../../public/Product";
import { ShoppingCart } from "lucide-react";
import { CourseContext } from "../context/ProductContext";
import { DeleteIcon } from "lucide-react";
import axiosInstance from "../utils/axios";
const Cart = () => {
  const { cartCourse, setCartCourse } = useContext(CourseContext);
  const [courseData, setCourseData] = useState([]);
  console.log(cartCourse);
  const getCourseData = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/course/${cartCourse.join(",")}`,
      );
      console.log(data);
      setCourseData(data.data);
    } catch (e) {
      throw e;
    }
  };
  useEffect(() => {
    // console.log("product mount");
    if (!cartCourse.length) {
      setCourseData([]);
      return;
    }
    getCourseData();
    return () => {
      console.log("product unmount");
    };
  }, [cartCourse]);
  return (
    <div className="w-full h-[calc(100vh-70px)] py-5 px-20 bg-gray-100 overflow-hidden">
      <div className="text-2xl font-semibold ">Your Cart</div>
      {/* Middle Div */}
      <div className="mt-6 bg-zinc-200  max-h-[55vh] overflow-y-auto scrollbar-hide rounded-md">
        {courseData.map((item) => (
          <div
            className="border-b w-full flex items-center h-24 px-6"
            key={item._id}
          >
            {/* Left Section */}
            <div className="flex-1 h-full flex items-center gap-4">
              <div className="h-[80%] w-40 rounded-md overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://procodrr.com/assets/images/backend%20with%20nodejs.webp"
                  alt="Node.js Fundamentals Course"
                  loading="lazy"
                />
              </div>

              <div>
                <strong className="text-md font-semibold">{item.name}</strong>

                <h6 className="text-sm">Quantity: 1</h6>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <div>₹ {item.price}</div>

              <button
                className="hover:text-white hover:bg-black/80  p-1 rounded-lg duration-300 ease-in-out"
                onClick={() => {
                  setCartCourse((prev) => prev.filter((id) => id !== item._id));
                }}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Last Div */}
      {cartCourse.length ? (
        <div className="mt-10 text-center bg-zinc-400/50 py-2 rounded-md font-semibold tracking-tighter text-md">
          <button>Proceed To CheckOut</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
