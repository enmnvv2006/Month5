import { GetPosts } from "./components/GetPosts/GetPosts";
import { CreatePosts } from "./components/CreatePosts/CreatePosts";
import { ToastContainer } from "react-toastify";

export const App = () => {
  return (
    <>
      <CreatePosts />
      <GetPosts />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};
