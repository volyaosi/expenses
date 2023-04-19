import styles from './expenseFormSection.module.css'
import { useAppDispatch, useAppSelector } from '@/hook'
import { addExpenseRecord } from 'store/expenseSlice'
import { ExpenseForm } from '../expenseForm/ExpenseForm'

export function ExpenseFormSection() {
    const dispatch = useAppDispatch()

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Add expenses</h2>
            <ExpenseForm
                direction="column"
                onSave={(value) => dispatch(addExpenseRecord(value))}
            />
        </div>
    )
}
