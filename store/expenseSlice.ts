import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from './store'

export interface ExpenseState {
    categoryList: string[]
    expenseRecordList: { category: string; amount: number }[]
}

const defaultCategoryList = [
    'Housing',
    'Transportation',
    'Food',
    'Utilities',
    'Insurance',
    'Medical',
    'Investing',
]

const initialState: ExpenseState = {
    categoryList: defaultCategoryList,
    expenseRecordList: [],
}

export const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<string>) => {
            state.categoryList = [...state.categoryList, action.payload]
        },
        addExpenseRecord: (
            state,
            action: PayloadAction<{ category: string; amount: number }>
        ) => {
            state.expenseRecordList = [
                ...state.expenseRecordList,
                action.payload,
            ]
        },
    },
})

export const { addCategory, addExpenseRecord } = expenseSlice.actions

export const categoryListSelector = (state: AppState) =>
    state.expense.categoryList
export const expenseRecordListSelector = (state: AppState) =>
    state.expense.expenseRecordList

export default expenseSlice.reducer
