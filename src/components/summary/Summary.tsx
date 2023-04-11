import { ExpenseRecord } from '../expenseRecord/ExpenseRecord'
import styles from './summary.module.css'

interface Props {
    recordList: ExpenseRecord[]
}

export default function Summary({ recordList }: Props) {
    return (
        <div className={styles.container}>
            <h2>Summary</h2>
            <div className={styles.content}>
                <SummaryContent recordList={recordList} />
            </div>
        </div>
    )
}

function SummaryContent({ recordList }: Props) {
    const isListEmpty = recordList.length === 0

    if (isListEmpty) {
        return <p>There is no expense record at the moment.</p>
    }

    return (
        <div>
            {recordList.map((record, i) => (
                <ExpenseRecord
                    key={i}
                    index={i}
                    category={record.category}
                    amount={record.amount}
                />
            ))}
        </div>
    )
}
