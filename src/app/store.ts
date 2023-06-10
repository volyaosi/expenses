import { configureStore } from '@reduxjs/toolkit'
import expenseReducer from './expenseSlice'

export function makeStore() {
    return configureStore({
        reducer: { expense: expenseReducer },
    })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
