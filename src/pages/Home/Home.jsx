import { useDispatch, useSelector } from "react-redux"
import styles from "./Home.module.scss"
import { useEffect, useState } from "react"
import { fetchAllRecipies } from "../../store/reducers/recipiesSlice"
import { Error } from "../../components/Error/Error"
import { List } from "../../components/List/List"
import { Loader } from "../../components/Loader/Loader"
import { useNavigate } from "react-router-dom"

export const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const recipies = useSelector((state) => state.recipies)
  console.log(recipies)
  const { loading, error } = recipies

  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ]

  const [selectLetter, setSelectLetter] = useState("")

  useEffect(() => {
    if (selectLetter === "") {
      dispatch(fetchAllRecipies())
    } else {
      dispatch(fetchAllRecipies(selectLetter))
    }
  }, [selectLetter])

  return (
    <div className={styles.main}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error === null ? (
            <>
              <div className={styles.alphabet}>
                <button onClick={() => navigate("/")}>Back</button>
                {alphabet.map((letter, id) => (
                  <div
                    key={id}
                    className={styles.letter}
                    onClick={() => setSelectLetter(letter)}
                  >
                    <p>{letter}</p>
                  </div>
                ))}
              </div>
              <List />
            </>
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
