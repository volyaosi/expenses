import { expenseRecordListSelector } from 'store/expenseSlice'
import styles from './summary.module.css'
import { ExpenseRecordComponent } from '../expenseRecord/ExpenseRecord'
import { useAppSelector } from '@/hook'

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
    const recordList = useAppSelector(expenseRecordListSelector)

    const isListEmpty = recordList.length === 0

    if (isListEmpty) {
        return <p>There is no expense record at the moment.</p>
    }

    return (
        <div>
            {recordList.map((record, i) => (
                <ExpenseRecordComponent
                    key={i}
                    index={i}
                    category={record.category}
                    amount={record.amount}
                />
            ))}
        </div>
    )
}
