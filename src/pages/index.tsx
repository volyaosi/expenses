import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import { DefinedCategory } from '@/components/categorySelector/CategorySelector';
import ExpenseForm from '@/components/expenseForm/ExpenseForm';

export default function Home() {
	const [expenseList, setExpenseList] = useState<
		{ category: DefinedCategory; amount: number }[]
	>([]);

	const handleAddExpenseRecord = (
		category: DefinedCategory,
		amount: number
	) => {
		const newExpense = { category, amount };
		setExpenseList((prevExpenses) => [...prevExpenses, newExpense]);
	};

	return (
		<>
			<Head>
				<title>Expenses</title>
				<meta name='description' content='Expense & Budget Tracking App' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<div className={styles.center}>
					<div className={styles.containerFlex}>
						<ExpenseForm onAddRecord={handleAddExpenseRecord} />
						<div>Summary</div>
					</div>
				</div>
			</main>
		</>
	);
}
