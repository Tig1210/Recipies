import { configureStore } from "@reduxjs/toolkit"
import { recipiesReducer } from "./reducers/recipiesSlice"
import { randomRecipieReducer } from "./reducers/randomRecipiesSlice"

export const store = configureStore({
  reducer: {
    recipies: recipiesReducer,
    randomRecipe: randomRecipieReducer,
  },
})
