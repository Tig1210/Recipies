import styles from "./List.module.scss"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchRecipiesById,
  nextPage,
  prevPage,
} from "../../store/reducers/recipiesSlice"
import { useNavigate } from "react-router-dom"

export const List = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const recipies = useSelector((state) => state.recipies)
  const { allRecipies, startCard, endCard } = recipies

  console.log(startCard, endCard)
  return (
    <div className={styles.main}>
      <div className={styles.list}>
        {allRecipies !== null ? (
          <>
            {allRecipies?.slice(startCard, endCard)?.map((recipe) => (
              <div
                key={recipe.idMeal}
                className={styles.card}
                onClick={() => {
                  navigate(`/${recipe.idMeal}`)
                  dispatch(fetchRecipiesById(recipe.idMeal))
                }}
              >
                <div className={styles.textInfo}>
                  <h2>{recipe.strMeal}</h2>
                </div>
                <div className={styles.info}>
                  <div className={styles.text}>
                    <p>{recipe.strCategory}</p>
                    <p>{recipe.strArea}</p>
                  </div>
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
            {allRecipies.length > 12 && (
              <div className={styles.nav}>
                {startCard !== 0 && (
                  <div className={styles.block}>
                    <p onClick={() => dispatch(prevPage())}>Prev</p>
                  </div>
                )}
                {endCard <= allRecipies.length && (
                  <div className={styles.block}>
                    <p onClick={() => dispatch(nextPage())}>Next</p>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <div className={styles.empty}>
              <h2>No recipies</h2>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
