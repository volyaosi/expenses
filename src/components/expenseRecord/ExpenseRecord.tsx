import styles from './expenseRecord.module.css'

export default function ExpenseRecord(props: {
	index: number
	categoryName: string
	amount: number
}) {
	return (
		<div className={styles.containerFlex}>
			<div>
				<span>{props.index + 1}. </span>
				<span>{props.categoryName}</span>
			</div>
			<span className={styles.amount}>${props.amount}</span>
		</div>
	)
}
