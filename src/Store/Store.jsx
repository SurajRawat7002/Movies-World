import { configureStore } from '@reduxjs/toolkit'
import personReducer from './Reducers/personSlice'
import tvReducer from './Reducers/tvSlice'
import movieReducer from './Reducers/MovieSlice'
export const store = configureStore({
  reducer: {
    movie:movieReducer,
    tv:tvReducer,
    people:personReducer,
  },
})

export default store