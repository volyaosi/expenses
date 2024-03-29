import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import ExpenseForm from '@/components/expenseForm/ExpenseForm'
import Summary from '@/components/summary/Summary'
import { ExpenseRecord } from '@/components/expenseRecord/ExpenseRecord'

export default function Home() {
    const [expenseList, setExpenseList] = useState<ExpenseRecord[]>([])

    const handleAddExpenseRecord = (category: string, amount: number) => {
        const newExpense = { category, amount }
        setExpenseList((prevExpenses) => [...prevExpenses, newExpense])
    }

    return (
        <>
            <Head>
                <title>Expenses</title>
                <meta
                    name="description"
                    content="Expense & Budget Tracking App"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div data-testId="app" className={styles.center}>
                    <div className={styles.containerFlex}>
                        <ExpenseForm onAddRecord={handleAddExpenseRecord} />
                        <Summary recordList={expenseList} />
                    </div>
                </div>
            </main>
        </>
    )
}
