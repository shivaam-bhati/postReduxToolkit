import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../features/slices/postsSlice'

export const store = configureStore({
    reducer : postsReducer
})