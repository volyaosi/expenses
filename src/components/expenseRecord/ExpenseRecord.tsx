import styles from './expenseRecord.module.css'

export interface ExpenseRecord {
    category: string
    amount: number
}

export const ExpenseRecord: React.FC<ExpenseRecord & { index: number }> = ({
    category,
    amount,
    index,
}) => {
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
