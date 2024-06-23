import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '../features/temp.reducer'

export const store = configureStore({
    reducer: {
        counter: counterSlice
    },
})