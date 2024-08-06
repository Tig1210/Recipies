import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_URL } from "../api/api"

const initialState = {
  allRecipies: [],
  loading: true,
  error: null,
  activeRecipie: {},
  startCard: 0,
  endCard: 12,
}

export const fetchAllRecipies = createAsyncThunk(
  "recipies/all",
  async (firstLetter = "a") => {
    try {
      const response = await fetch(`${API_URL}/search.php?f=${firstLetter}`, {
        method: "GET",
      })
      if (response.status !== 200) {
        throw new Error("Server Error")
      }
      const result = await response.json()
      return result.meals
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
)

export const fetchRecipiesById = createAsyncThunk(
  "recipies/byId",
  async (id) => {
    try {
      const response = await fetch(`${API_URL}/lookup.php?i=${id}`, {
        method: "GET",
      })
      if (response.status !== 200) {
        throw new Error("Server Error")
      }
      const result = await response.json()
      console.log(result.meals[0])
      return result.meals[0]
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
)

export const recipiesSlice = createSlice({
  name: "recipies",
  initialState,
  reducers: {
    prevPage: (state) => {
      if (state.startCard !== 0) {
        state.startCard -= 12
        state.endCard -= 12
      }
    },
    nextPage: (state) => {
      if (state.endCard <= state.allRecipies.length) {
        state.endCard += 12
        state.startCard += 12
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllRecipies.pending, (state) => {
      state.loading = true
      state.error = null
      state.allRecipies = []
    })
    builder.addCase(fetchAllRecipies.fulfilled, (state, action) => {
      state.loading = false
      state.allRecipies = action.payload
    })
    builder.addCase(fetchAllRecipies.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    builder.addCase(fetchRecipiesById.pending, (state) => {
      state.loading = true
      state.error = null
      state.activeRecipie = {}
    })
    builder.addCase(fetchRecipiesById.fulfilled, (state, action) => {
      state.loading = false
      state.activeRecipie = action.payload
    })
    builder.addCase(fetchRecipiesById.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

export const { prevPage, nextPage } = recipiesSlice.actions

export const recipiesReducer = recipiesSlice.reducer
