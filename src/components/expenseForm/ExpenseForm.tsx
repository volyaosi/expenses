import { useState } from 'react'
import CategorySelector from '../categorySelector/CategorySelector'
import { CategoryList } from './CategoryList'
import styles from './expenseForm.module.css'

export default function ExpenseForm(props: {
	onAddRecord: (category: string, amount: number) => void
}) {
	const [categoryList, setCategoryList] = useState(CategoryList.create())
	const [category, setCategory] = useState<string | undefined>(undefined)
	const [amount, setAmount] = useState(0)

	const minExpenseValue = 0.01

	const handleSubmit = (e: React.MouseEvent) => {
		e.preventDefault()

		if (category !== undefined && !isNaN(amount) && amount >= minExpenseValue) {
			props.onAddRecord(category, amount)
			setCategory(undefined)
			setAmount(0)
		}
	}

	const handleAddNewCategory = (value: string) => {
		setCategoryList([...categoryList, value])
	}

	return (
		<div className={styles.container}>
			<h2 className={styles.header}>Add expenses</h2>
			<CategorySelector
				optionList={categoryList}
				selectedOption={category}
				onSelect={setCategory}
				onAddCategory={handleAddNewCategory}
			/>

			<input
				type="number"
				min={minExpenseValue}
				value={amount}
				placeholder="Spent amount"
				onChange={(event) => setAmount(parseFloat(event.target.value))}
			/>
			<button onClick={handleSubmit}>Save</button>
		</div>
	)
}
