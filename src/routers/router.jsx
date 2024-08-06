import { createBrowserRouter } from "react-router-dom"
import { Home } from "../pages/Home/Home"
import { ActiveRecipie } from "../pages/ActiveRecipie/ActiveRecipie"
import { RandomRecipie } from "../pages/RandomRecipie/RandomRecipie"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RandomRecipie />,
  },
  {
    path: "/all",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <ActiveRecipie />,
  },
])
