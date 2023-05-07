import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

type StateObject<T extends { id: number }> = {
    ids: number[]
    items: Record<number, T>
}

export interface Expense {
    id: number
    categoryId: number
    amount: number
}

export interface Category {
    id: number
    name: string
}

interface State {
    expenses: StateObject<Expense> | {}
    categories: StateObject<Category>
}

const store = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
