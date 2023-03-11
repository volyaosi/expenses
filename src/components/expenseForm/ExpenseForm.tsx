import { useState } from 'react';
import CategorySelector, {
	DefinedCategory,
	Category,
} from '../categorySelector/CategorySelector';
import styles from './expenseForm.module.css';

export default function ExpenseForm(props: {
	onAddRecord: (category: DefinedCategory, amount: number) => void;
}) {
	const [category, setCategory] = useState<Category>(undefined);
	const [amount, setAmount] = useState(0);
	const categoryList: Category[] = [
		undefined,
		'Housing',
		'Transportation',
		'Food',
		'Utilities',
		'Insurance',
		'Medical & Healthcare',
		'Saving & Investing',
		'Other',
	];

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
		setCategory(undefined);
		setAmount(0);
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.header}>Add expenses</h2>
			<CategorySelector
				optionList={categoryList}
				selectedOption={category}
				onSelect={setCategory}
			/>

			<input
				type='number'
				min={minExpenseValue}
				value={amount}
				placeholder='Spent amount'
				onChange={(event) => setAmount(event.target.valueAsNumber)}
			/>
			<button onClick={handleSubmit}>Save</button>
		</div>
	);
}

function isDefinedCategory(value: Category): value is DefinedCategory {
	return value !== undefined;
}
