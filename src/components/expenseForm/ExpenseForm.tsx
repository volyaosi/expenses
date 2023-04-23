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
import IconButton, {
    IconButtonProps,
} from '../utilComponents/buttonIcon/ButtonIcon'

const emptyExpenseRecord = { category: undefined, amount: 0 }

type ExpenseFormProps = {
    direction: 'row' | 'column'
    recordValue?: ExpenseRecord | typeof emptyExpenseRecord
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
    recordValue = emptyExpenseRecord,
    isFormButtonMinified = false,
    onSubmit,
    onCancelSubmit,
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

    const submitButtonProps = isFormButtonMinified
        ? { svgPath: IconPath.check, type: 'success' as const }
        : { title: 'Save' }
    const cancelButtonProps = isFormButtonMinified
        ? { svgPath: IconPath.xMark, type: 'basic' as const }
        : { title: 'Cancel' }

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

            <div className={styles.buttonContainer}>
                <FormButton
                    {...submitButtonProps}
                    onClick={handleSubmit}
                    isDisabled={!isButtonEnabled(amount, category)}
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
