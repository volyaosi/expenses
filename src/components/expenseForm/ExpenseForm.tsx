import { useState } from 'react';
import CategorySelector, {
	DefinedCategory,
	Category,
	CATEGORY_LIST,
	isDefinedCategory,
} from '../categorySelector/CategorySelector';
import styles from './expenseForm.module.css';

export default function ExpenseForm(props: {
	onAddRecord: (category: DefinedCategory, amount: number) => void;
}) {
	const [category, setCategory] = useState<Category>('DEFAULT');
	const [amount, setAmount] = useState(0);

	const minExpenseValue = 0.01;

	const handleSubmit = (e: React.MouseEvent) => {
		e.preventDefault();

		if (
			!isDefinedCategory(category) ||
			isNaN(amount) ||
			amount < minExpenseValue
		) {
			return;
		}
		props.onAddRecord(category, amount);
		setCategory('DEFAULT');
		setAmount(0);
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.header}>Add expenses</h2>
			<CategorySelector
				optionList={Object.values(CATEGORY_LIST) as Category[]}
				selectedOption={category}
				onSelect={setCategory}
			/>

			<input
				type='number'
				min={minExpenseValue}
				value={amount}
				placeholder='Spent amount'
				onChange={(event) => setAmount(parseFloat(event.target.value))}
			/>
			<button onClick={handleSubmit}>Save</button>
		</div>
	);
}
