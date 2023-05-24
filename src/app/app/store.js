import { configureStore } from '@reduxjs/toolkit'
import keranjangReducer from '../redux/features/keranjangSlice'

export const store = configureStore({
  reducer: {
    keranjang: keranjangReducer
  },
})