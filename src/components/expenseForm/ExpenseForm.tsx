import { useState } from 'react'
import CategorySelector from '../categorySelector/CategorySelector'
import styles from './expenseForm.module.css'
import { useAppDispatch, useAppSelector } from '@/hook'
import {
    ExpenseRecord,
    addCategory,
    categoryListSelector,
} from 'store/expenseSlice'
import { IconPath } from '../utilComponents/icon/IconPath'
import IconButton from '../utilComponents/buttonIcon/ButtonIcon'

const emptyExpenseRecord = { category: undefined, amount: 0 }

type ExpenseFormProps = {
    direction: 'row' | 'column'
    submitButtonTitle: string
    recordValue?: ExpenseRecord | typeof emptyExpenseRecord
    isSubmitButtonMinified?: boolean
    onSubmit: (value: ExpenseRecord) => void
}

interface SubmitButtonProps {
    title: string
    onSubmit: (e: React.MouseEvent) => void
    isEnabled: boolean
}

export function ExpenseForm({
    direction,
    submitButtonTitle,
    recordValue = emptyExpenseRecord,
    isSubmitButtonMinified = false,
    onSubmit,
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

    const handleSubmit = () => {
        if (category !== undefined) {
            onSubmit({ category, amount })
            setCategory(undefined)
            setAmount(0)
        }
    }

    return (
        <div
            className={`${styles.container} ${
                direction === 'row'
                    ? styles.containerGridRow
                    : styles.containerFlexCol
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
                className={styles.numberInput}
            />
            {isSubmitButtonMinified ? (
                <IconButton
                    svgPath={IconPath.check}
                    onClick={handleSubmit}
                    type="success"
                    isDisabled={!isButtonEnabled(amount, category)}
                />
            ) : (
                <SubmitButton
                    title={submitButtonTitle}
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit()
                    }}
                    isEnabled={isButtonEnabled(amount, category)}
                />
            )}
        </div>
    )
}

const SubmitButton = ({ title, onSubmit, isEnabled }: SubmitButtonProps) => {
    return (
        <button
            onClick={onSubmit}
            className={isEnabled ? styles.enabledButton : styles.disabledButton}
            disabled={!isEnabled}
        >
            {title}
        </button>
    )
}
