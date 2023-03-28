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
	const [isRecordAddEnabled, setRecordAddEnabled] = useState(false)

	const minExpenseValue = 0.01

	const validateAnswer = (props: {
		newAmount?: number
		newCategory?: string
	}) => {
		const amountToVerify = props.newAmount ?? amount
		const categoryToVerify = props.newCategory ?? category

		if (
			!isNaN(amountToVerify) &&
			amountToVerify >= minExpenseValue &&
			categoryToVerify
		) {
			setRecordAddEnabled(true)
		} else {
			setRecordAddEnabled(false)
		}
	}

	const onCategorySelect = (value: string | undefined) => {
		setCategory(value)
		validateAnswer({ newCategory: value })
	}

	const onAmountSet = (value: number) => {
		setAmount(value)
		validateAnswer({ newAmount: value })
	}

	const handleSubmit = (e: React.MouseEvent) => {
		e.preventDefault()

		if (category !== undefined) {
			props.onAddRecord(category, amount)
			setCategory(undefined)
			setAmount(0)
			setRecordAddEnabled(false)
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
				onSelect={onCategorySelect}
				onAddCategory={handleAddNewCategory}
			/>

			<input
				type="number"
				min={minExpenseValue}
				value={amount}
				placeholder="Spent amount"
				onInput={(event: React.BaseSyntheticEvent) =>
					onAmountSet(parseFloat(event.target.value))
				}
			/>
			<button
				onClick={(event) => {
					if (isRecordAddEnabled) handleSubmit(event)
				}}
				className={
					isRecordAddEnabled ? styles.enabledButton : styles.disabledButton
				}
			>
				Save
			</button>
		</div>
	)
}
