import { useEffect, useState } from "react"
import styles from "./RecipieInfo.module.scss"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const RecipieInfo = () => {
  const navigate = useNavigate()
  const recipies = useSelector((state) => state.recipies)
  const { activeRecipie } = recipies

  const [allIngridients, setAllIngridients] = useState([])
  const [allMeasure, setAllMesure] = useState([])

  function formatStrWithNum(setArr, str) {
    for (let el in activeRecipie) {
      if (
        el.includes(str) &&
        activeRecipie[el] !== "" &&
        activeRecipie[el] !== null
      ) {
        setArr((prev) => [...prev, activeRecipie[el].split(",")[0]])
      }
    }
  }

  const selectImg = (name) => {
    if (name.includes("egg")) {
      return "eggs"
    } else {
      return name
    }
  }

  useEffect(() => {
    formatStrWithNum(setAllIngridients, "strIngredient")
    formatStrWithNum(setAllMesure, "strMeasure")
  }, [])

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h2>{activeRecipie.strMeal}</h2>
        <div className={styles.bl}>
          <img src={activeRecipie.strMealThumb} alt={activeRecipie.strMeal} />
          <div className={styles.info}>
            <div className={styles.text}>
              <div>
                <h3>Instruction</h3>
                <p>{activeRecipie.strInstructions}</p>
              </div>
              <div className={styles.list}>
                <h3>Ingredients</h3>
                <div className={styles.ingredients}>
                  {allIngridients.map((ingreidient, id) => (
                    <div className={styles.ingredient} key={id}>
                      <img
                        src={`https:/www.themealdb.com/images/ingredients/${selectImg(ingreidient)}-Small.png`}
                        alt={ingreidient}
                      />
                      <div className={styles.text}>
                        <p>{ingreidient}</p>
                        <p>
                          {allMeasure.filter(
                            (measure, measureID) => measureID === id
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => navigate("/all")}>Back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
