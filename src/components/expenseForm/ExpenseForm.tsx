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

	const isButtonEnabled = (
		amountToVerify: number,
		categoryToVerify?: string
	) => {
		return (
			!isNaN(amountToVerify) &&
			amountToVerify >= minExpenseValue &&
			!!categoryToVerify
		)
	}

	const handleSubmit = (e: React.MouseEvent) => {
		e.preventDefault()

		if (category !== undefined) {
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
				onInput={(event: React.BaseSyntheticEvent) =>
					setAmount(parseFloat(event.target.value))
				}
			/>
			<SubmitButton
				title="Save"
				onSubmit={handleSubmit}
				isEnabled={isButtonEnabled(amount, category)}
			/>
		</div>
	)
}

const SubmitButton = (props: {
	title: string
	onSubmit: (e: React.MouseEvent) => void
	isEnabled: boolean
}) => {
	return (
		<button
			onClick={(e) => {
				if (props.isEnabled) props.onSubmit(e)
			}}
			className={props.isEnabled ? styles.enabledButton : styles.disabledButton}
		>
			{props.title}
		</button>
	)
}
