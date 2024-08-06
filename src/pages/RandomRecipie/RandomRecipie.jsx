import { useDispatch, useSelector } from "react-redux"
import styles from "./RandomRecipie.module.scss"
import { useEffect } from "react"
import { fetchRandomRecipie } from "../../store/reducers/randomRecipiesSlice"
import { useNavigate } from "react-router-dom"
import { Error } from "../../components/Error/Error"
import { Loader } from "../../components/Loader/Loader"
import { fetchRecipiesById } from "../../store/reducers/recipiesSlice"

export const RandomRecipie = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const randomRecipie = useSelector((state) => state.randomRecipe)

  const { loading, error, recipie } = randomRecipie

  useEffect(() => {
    dispatch(fetchRandomRecipie())
  }, [])

  return (
    <div className={styles.main}>
      <h2 onClick={() => navigate("/all")}>All</h2>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error === null ? (
            <div>
              <img src={recipie.strMealThumb} alt={recipie.strMeal} />
              <h2>{recipie.strMeal}</h2>
              <button
                onClick={() => {
                  navigate(`/${recipie.idMeal}`)
                  dispatch(fetchRecipiesById(recipie.idMeal))
                }}
              >
                Info
              </button>
            </div>
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
