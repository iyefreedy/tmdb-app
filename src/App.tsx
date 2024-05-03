import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@pages/Home";
import Movie from "@pages/Movie";
import Login from "@pages/Login";
import Error from "./pages/Error";
import RootLayout from "./components/RootLayout";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist";
import Ratings from "./pages/Ratings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/movie/:movieId",
        element: <Movie />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/watchlist",
        element: <Watchlist />,
      },
      {
        path: "/ratings",
        element: <Ratings />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
