import { RouterProvider } from "react-router-dom"
import { router } from "../../routers/router"

import styles from "./Main.module.scss"

export const Main = () => {
  return (
    <div className={styles.main}>
      <RouterProvider router={router} />
    </div>
  )
}
