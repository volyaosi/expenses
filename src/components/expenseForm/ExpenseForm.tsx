import { useState } from 'react'
import CategorySelector from '../categorySelector/CategorySelector'
import styles from './expenseForm.module.css'
import { useAppDispatch, useAppSelector } from '@/hook'
import {
    ExpenseRecord,
    addCategory,
    addExpenseRecord,
    categoryListSelector,
} from 'store/expenseSlice'

type ExpenseFormProps = {
    direction: 'row' | 'column'
    isSaveButtonMinified?: boolean
    onSave: (value: ExpenseRecord) => void
}

interface SubmitButtonProps {
    title: string
    onSubmit: (e: React.MouseEvent) => void
    isEnabled: boolean
}

export function ExpenseFormSection() {
    const dispatch = useAppDispatch()

    return (
        <div className={styles.section}>
            <h2 className={styles.header}>Add expenses</h2>
            <ExpenseForm
                direction="column"
                onSave={(value) => dispatch(addExpenseRecord(value))}
            />
        </div>
    )
}

export function ExpenseForm({
    direction,
    isSaveButtonMinified,
    onSave,
}: ExpenseFormProps) {
    const dispatch = useAppDispatch()
    const categoryList = useAppSelector(categoryListSelector)
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
            onSave({ category, amount })
            setCategory(undefined)
            setAmount(0)
        }
    }

    return (
        <div
            className={`${styles.container} ${
                direction === 'row'
                    ? styles.containerRowDirection
                    : styles.containerColDirection
            }`}
        >
            <CategorySelector
                optionList={categoryList}
                selectedOption={category}
                onSelect={setCategory}
                onAddCategory={(value) => dispatch(addCategory(value))}
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
