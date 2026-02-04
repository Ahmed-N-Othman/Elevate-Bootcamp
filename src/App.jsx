import MainLayout from "./components/layout/MainLayout";
import PostForm from "./features/post-form";
import PostsList from "./features/Posts-list";
import {
  BrowserRouter as Router,
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PostDetails from "./pages/PostDetails";

function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <PostsList />,
        },
        {
          path: "create-post",
          element: <PostForm />,
        },
        {
          path: "post/:id",
          element: <PostDetails />,
        },

        {
          path: "*",
          element: <Navigate to="/" replace />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
