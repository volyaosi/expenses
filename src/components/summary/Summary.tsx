import { useAppSelector } from '@/app/hook'
import styles from './summary.module.css'
import { categoriesSelector, expensesSelector } from '@/app/expenseSlice'
import { ExpenseRecord } from '../expenseRecord/ExpenseRecord'

export default function Summary() {
    return (
        <div className={styles.container}>
            <h2>Summary</h2>
            <div className={styles.content}>
                <SummaryContent />
            </div>
        </div>
    )
}

function SummaryContent() {
    const categories = useAppSelector(categoriesSelector).items
    const records = useAppSelector(expensesSelector).items
    const recordList = Object.values(records)
    const isListEmpty = recordList.length === 0

    if (isListEmpty) {
        return <p>There is no expense record at the moment.</p>
    }

    return (
        <div>
            {recordList.map((record, i) => (
                <ExpenseRecord
                    key={record.id}
                    category={categories[record.categoryId].name}
                    record={record}
                />
            ))}
        </div>
    )
}
