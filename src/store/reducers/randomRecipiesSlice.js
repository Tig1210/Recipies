import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_URL } from "../api/api"

const initialState = {
  recipie: {},
  loading: true,
  error: null,
}

export const fetchRandomRecipie = createAsyncThunk(
  "randomRecipie",
  async () => {
    try {
      const response = await fetch(`${API_URL}/random.php`, {
        method: "GET",
      })
      if (response.status !== 200) {
        throw new Error("Server Error")
      }
      const result = await response.json()
      return result.meals[0]
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
)

export const randomRecipiesSlice = createSlice({
  name: "randomRecipies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRandomRecipie.pending, (state) => {
      state.loading = true
      state.error = null
      state.recipie = {}
    })
    builder.addCase(fetchRandomRecipie.fulfilled, (state, action) => {
      state.loading = false
      state.recipie = action.payload
    })
    builder.addCase(fetchRandomRecipie.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

export const randomRecipieReducer = randomRecipiesSlice.reducer
