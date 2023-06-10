import styles from './expenseFormSection.module.css'
import { ExpenseForm } from '../expenseForm/ExpenseForm'
import { addExpense } from '@/app/expenseSlice'
import { useAppDispatch } from '@/app/hook'

export function ExpenseFormSection() {
    const dispatch = useAppDispatch()

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Add expenses</h2>
            <ExpenseForm
                direction="column"
                onSubmit={(value) => dispatch(addExpense(value))}
                recordValue={undefined}
            />
        </div>
    )
}
