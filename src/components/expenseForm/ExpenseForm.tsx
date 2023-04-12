import { useState } from 'react'
import CategorySelector from '../categorySelector/CategorySelector'
import styles from './expenseForm.module.css'

interface ExpenseFormProps {
    onAddRecord: (category: string, amount: number) => void
}

interface SubmitButtonProps {
    title: string
    onSubmit: (e: React.MouseEvent) => void
    isEnabled: boolean
}

const defaultCategoryList = [
    'Housing',
    'Transportation',
    'Food',
    'Utilities',
    'Insurance',
    'Medical',
    'Investing',
]

export default function ExpenseForm({ onAddRecord }: ExpenseFormProps) {
    const [categoryList, setCategoryList] = useState(defaultCategoryList)
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
            onAddRecord(category, amount)
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

const SubmitButton = ({ title, onSubmit, isEnabled }: SubmitButtonProps) => {
    return (
        <button
            onClick={(e) => {
                if (isEnabled) onSubmit(e)
            }}
            className={isEnabled ? styles.enabledButton : styles.disabledButton}
        >
            {title}
        </button>
    )
}
