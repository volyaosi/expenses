import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useState } from 'react';

export default function Home() {
	const [expenseList, setExpenseList] = useState<
		{ category: string; amount: number }[]
	>([]);

	const handleAddExpenseRecord = (category: string, amount: number) => {
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
						<div>Expenses form</div>
						<div>Summary</div>
					</div>
				</div>
			</main>
		</>
	);
}
