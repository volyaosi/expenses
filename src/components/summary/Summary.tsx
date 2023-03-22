import { DefinedCategory } from '../categorySelector/CategorySelector'
import ExpenseRecord from '../expenseRecord/ExpenseRecord'
import styles from './summary.module.css'

export default function Summary(props: {
	recordList: { category: DefinedCategory; amount: number }[]
}) {
	const isListEmpty = props.recordList.length === 0
	return (
		<div className={styles.container}>
			<h2>Summary</h2>
			<div className={styles.content}>
				{isListEmpty ? (
					<p>There is no expense record at the moment.</p>
				) : (
					props.recordList.map((record, i) => (
						<ExpenseRecord
							key={i}
							index={i}
							categoryName={record.category}
							amount={record.amount}
						/>
					))
				)}
			</div>
		</div>
	)
}
