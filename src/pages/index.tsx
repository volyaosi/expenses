import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import ExpenseForm from '@/components/expenseForm/ExpenseForm'
import Summary from '@/components/summary/Summary'

export default function Home() {
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
                <div className={styles.center}>
                    <div className={styles.containerFlex}>
                        <ExpenseForm />
                        <Summary />
                    </div>
                </div>
            </main>
        </>
    )
}
