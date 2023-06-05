import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppState } from './store'

type StateObject<T extends EntityWithId> = {
    ids: number[]
    items: Record<number, T>
    selectedId?: number
}

export type EntityWithId = {
    id: number
    [key: string]: string | number
}

export interface Expense extends EntityWithId {
    id: number
    categoryId: number
    amount: number
}

export interface Category extends EntityWithId {
    id: number
    name: string
}

interface State {
    expenses: StateObject<Expense>
    categories: StateObject<Category>
}

const initialState: State = {
    expenses: { ids: [], items: {} },
    categories: {
        ids: [0, 1, 2, 3, 4],
        selectedId: undefined,
        items: {
            0: {
                id: 0,
                name: 'Housing',
            },
            1: {
                id: 1,
                name: 'Transportation',
            },
            2: {
                id: 2,
                name: 'Investing',
            },
            3: {
                id: 3,
                name: 'Food',
            },
            4: {
                id: 4,
                name: 'Medical',
            },
        },
    },
}
export const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<string>) => {
            const id = state.categories.ids.length
            const newCategory: Category = {
                id,
                name: action.payload,
            }

            state.categories = {
                ids: [...state.categories.ids, id],
                items: { ...state.categories.items, [id]: newCategory },
                selectedId: id,
            }
        },
        selectCategoryId: (
            state,
            action: PayloadAction<number | undefined>
        ) => {
            state.categories = {
                ids: [...state.categories.ids],
                items: { ...state.categories.items },
                selectedId: action.payload,
            }
        },
        addExpense: (
            state,
            action: PayloadAction<{ categoryId: number; amount: number }>
        ) => {
            const id = state.expenses.ids.length
            const newExpense: Expense = {
                id,
                categoryId: action.payload.categoryId,
                amount: action.payload.amount,
            }

            state.expenses = {
                ids: [...state.expenses.ids, id],
                items: { ...state.expenses.items, [id]: newExpense },
            }
        },
    },
})

export const { addCategory, selectCategoryId, addExpense } =
    expenseSlice.actions

export const categoriesSelector = (state: AppState) => state.expense.categories
export const expensesSelector = (state: AppState) => state.expense.expenses

export default expenseSlice.reducer
