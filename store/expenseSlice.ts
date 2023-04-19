import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from './store'

export interface ExpenseRecord {
    category: string
    amount: number
}

export interface ExpenseState {
    categoryList: string[]
    expenseRecordList: ExpenseRecord[]
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
        addExpenseRecord: (state, action: PayloadAction<ExpenseRecord>) => {
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
