import { useState } from 'react'
import { CategorySelector } from '../categorySelector/CategorySelector'
import styles from './expenseForm.module.css'

import { IconPath } from '../utilComponents/icon/IconPath'
import IconButton, {
    IconButtonProps,
} from '../utilComponents/buttonIcon/ButtonIcon'
import {
    categoriesSelector,
    addCategory,
    Expense,
    selectCategoryId,
} from '@/app/expenseSlice'
import { useAppDispatch, useAppSelector } from '@/app/hook'

type ExpenseRecord = Pick<Expense, 'amount' | 'categoryId'>

type ExpenseFormProps = {
    direction: 'row' | 'column'
    recordValue?: ExpenseRecord
    isFormButtonMinified?: boolean
    onSubmit: (value: ExpenseRecord) => void
    onCancelSubmit?: () => void
}

interface FormButtonProps {
    title: string
    onClick: () => void
    isDisabled?: boolean
}

export function ExpenseForm({
    direction,
    recordValue,
    isFormButtonMinified = false,
    onSubmit,
    onCancelSubmit,
}: ExpenseFormProps) {
    const dispatch = useAppDispatch()

    const categories = useAppSelector(categoriesSelector).items
    const selectedCategoryId = useAppSelector(categoriesSelector).selectedId
    const [amount, setAmount] = useState(recordValue ? recordValue.amount : 0)
    const minExpenseValue = 0.01

    const isButtonEnabled = (
        amountToVerify: number,
        categoryToVerify?: number
    ) => {
        return (
            !isNaN(amountToVerify) &&
            amountToVerify >= minExpenseValue &&
            categoryToVerify !== undefined &&
            !isNaN(categoryToVerify)
        )
    }

    const submitButtonProps = isFormButtonMinified
        ? { svgPath: IconPath.check, type: 'success' as const }
        : { title: 'Save' }
    const cancelButtonProps = isFormButtonMinified
        ? { svgPath: IconPath.xMark, type: 'basic' as const }
        : { title: 'Cancel' }

    const handleSubmit = () => {
        if (selectedCategoryId !== undefined) {
            onSubmit({ categoryId: selectedCategoryId, amount })
            dispatch(selectCategoryId(undefined))
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
                optionList={Object.values(categories)}
                selectedId={selectedCategoryId}
                onSelect={(value) => dispatch(selectCategoryId(value))}
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

            <div className={styles.buttonContainer}>
                <FormButton
                    {...submitButtonProps}
                    onClick={handleSubmit}
                    isDisabled={!isButtonEnabled(amount, selectedCategoryId)}
                />
                {onCancelSubmit && (
                    <FormButton
                        {...cancelButtonProps}
                        onClick={onCancelSubmit}
                    />
                )}
            </div>
        </div>
    )
}

const FormButton = (props: FormButtonProps | IconButtonProps) => {
    if (isIconButtonProps(props)) {
        return (
            <IconButton
                svgPath={props.svgPath}
                onClick={props.onClick}
                type={props.type}
                isDisabled={props.isDisabled}
            />
        )
    }
    return (
        <button
            onClick={props.onClick}
            className={
                props.isDisabled ? styles.disabledButton : styles.enabledButton
            }
            disabled={props.isDisabled}
        >
            {props.title}
        </button>
    )
}

function isIconButtonProps(
    props: FormButtonProps | IconButtonProps
): props is IconButtonProps {
    return 'svgPath' in props
}
