import React, { useContext, useState, useEffect } from "react";
import proudcts from "../../public/Product";
import { ShoppingCart } from "lucide-react";
import { CourseContext } from "../context/ProductContext";
import { DeleteIcon } from "lucide-react";
import axiosInstance from "../utils/axios";
import axios from "axios";
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
  console.log(courseData);

  const createOrder = async () => {
    try {
      // 1. Calculate total amount
      const amount = courseData.reduce(
        (total, item) => total + Number(item.price),
        0,
      );

      if (amount <= 0) {
        console.error("Invalid payment amount");
        return;
      }

      // 2. Create payment order on backend
      const response = await axiosInstance.post("/paytm/createOrder", {
        amount,
      });

      const { orderId, txnToken, amount: paymentAmount } = response.data;

      // 3. Prepare Paytm Checkout configuration
      const config = {
        root: "",

        flow: "DEFAULT",

        data: {
          orderId,
          token: txnToken,
          tokenType: "TXN_TOKEN",
          amount: paymentAmount.toString(),
        },

        handler: {
          notifyMerchant: (eventName, data) => {
            console.log("Paytm Event:", eventName);
            console.log("Paytm Data:", data);
          },
        },
      };

      // 4. Initialize Paytm Checkout
      await window.Paytm.CheckoutJS.init(config);

      // 5. Open Paytm Checkout
      window.Paytm.CheckoutJS.invoke();
    } catch (error) {
      console.error(
        "Paytm Payment Error:",
        error.response?.data || error.message,
      );
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
      <div className="mt-6 h-[55vh] overflow-y-auto scrollbar-hide rounded-md  bg-zinc-200/40">
        {courseData.length ? (
          courseData.map((item) => (
            <div
              className="border-b  bg-zinc-200 w-full flex items-center h-24 px-6"
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
                    setCartCourse((prev) =>
                      prev.filter((id) => id !== item._id),
                    );
                  }}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm font-semibold -translate-x-[50%] -translate-y-[50%] absolute left-[50%] top-[50%]  animate-bounce">
            Your Cart is Empty
          </div>
        )}
      </div>
      {/* Last Div */}
      {cartCourse.length ? (
        <div
          className="mt-10 text-center bg-zinc-400/50 py-2 rounded-md font-semibold tracking-tighter text-md"
          onClick={createOrder}
        >
          <button>Proceed To CheckOut</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
