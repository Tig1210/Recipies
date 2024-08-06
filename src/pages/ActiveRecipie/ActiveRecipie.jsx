import { useSelector } from "react-redux"
import styles from "./ActiveRecipie.module.scss"
import { Loader } from "../../components/Loader/Loader"
import { Error } from "../../components/Error/Error"
import { RecipieInfo } from "../../components/RecipieInfo/RecipieInfo"

export const ActiveRecipie = () => {
  const recipies = useSelector((state) => state.recipies)
  const { activeRecipie, loading, error } = recipies

  return (
    <div className={styles.main}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error === null ? (
            <RecipieInfo recipie={activeRecipie} />
          ) : (
            <>
              <Error err={error} />
            </>
          )}
        </>
      )}
    </div>
  )
}
