import { RouterProvider } from "react-router-dom";
import CourseProvider from "./context/ProductContext";
import Router from "./routes/Router";
const App = () => {
  console.log("app.jsx mount");
  console.log(import.meta);
  console.log(import.meta.env.SECRET_SERVER);
  return (
    <CourseProvider>
      <RouterProvider router={Router} />
    </CourseProvider>
  );
};

export default App;
