import { ExpenseRecord } from 'store/expenseSlice'
import styles from './expenseRecord.module.css'

export const ExpenseRecordComponent: React.FC<
    ExpenseRecord & { index: number }
> = ({ category, amount, index }) => {
    return (
        <div className={styles.containerFlex}>
            <div>
                <span>{index + 1}. </span>
                <span>{category}</span>
            </div>
            <span className={styles.amount}>${amount}</span>
        </div>
    )
}
