import { useState } from 'react'
import CategorySelector from '../categorySelector/CategorySelector'
import styles from './expenseForm.module.css'
import { useAppDispatch, useAppSelector } from '@/hook'
import {
    ExpenseRecord,
    addCategory,
    categoryListSelector,
} from 'store/expenseSlice'

const emptyExpenseRecord = { category: undefined, amount: 0 }
type ExpenseFormProps = {
    direction: 'row' | 'column'
    isSaveButtonMinified?: boolean
    recordValue?: ExpenseRecord | typeof emptyExpenseRecord
    onSave: (value: ExpenseRecord) => void
}

interface SubmitButtonProps {
    title: string
    onSubmit: (e: React.MouseEvent) => void
    isEnabled: boolean
}

export function ExpenseForm({
    direction,
    isSaveButtonMinified,
    recordValue = emptyExpenseRecord,
    onSave,
}: ExpenseFormProps) {
    const dispatch = useAppDispatch()
    const categoryList = useAppSelector(categoryListSelector)
    const [category, setCategory] = useState<string | undefined>(
        recordValue.category
    )
    const [amount, setAmount] = useState(recordValue.amount)
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
