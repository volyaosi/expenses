import { PayloadAction } from '@reduxjs/toolkit'
// import { AppState } from '../src/app/store'

type StateObject<T extends { id: number }> = {
    ids: number[]
    items: Record<number, T>
}

export interface ExpenseRecord {
    id: number
    categoryId: number
    amount: number
}

export interface Category {
    id: number
    name: string
}

interface State {
    expenses: StateObject<ExpenseRecord>
    categories: StateObject<Category>
}
const initialState: State = {
    expenses: { ids: [], items: {} },
    categories: {
        ids: [0, 1, 2, 3, 4, 5, 6],
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

export const rootReducer = {
    reducers: {
        addCategory: (state:State, action: PayloadAction<string>) => {
            // const newId =  getNextId();
            const newId =  state.categories.ids.length;

            const newCategory = {
                id:newId,
                nsme: action.payload
            };

            const newList = [...state.categories.ids, newId];
            const newCategoryItems = {[newId]:newCategory, ...state.categories}
            return {
                ...state,
                categories: {
                    id: newList,
                    items: newCategoryItems
            }
        }
    },
        addExpenseRecord: (state: State, action: PayloadAction<ExpenseRecord>) => {
             const newId =  state.expenses.ids.length;

            const newExpense = {
                id:newId,
                nsme: action.payload
            };

            const newList = [...state.expenses, newId];
            const newCategoryItems = {[newId]:newCategory, ...state.categories}
            return {
                ...state,
                categories: {
                    id: newList,
                    items: newCategoryItems
            }
            state.expenseRecordList = [
                ...state.expenseRecordList,
                action.payload,
            ]
        },
        editExpenseRecord: (
            state,
            action: PayloadAction<{ record: ExpenseRecord; index: number }>
        ) => {
            state.expenseRecordList = state.expenseRecordList.map(
                (record, index) =>
                    index === action.payload.index
                        ? action.payload.record
                        : record
            )
        },
    },
})

// export const { addCategory, addExpenseRecord, editExpenseRecord } =
//     expenseSlice.actions

// export const categoryListSelector = (state: AppState) =>
//     state.expense.categoryList
// export const expenseRecordListSelector = (state: AppState) =>
//     state.expense.expenseRecordList

// export default expenseSlice.reducer
