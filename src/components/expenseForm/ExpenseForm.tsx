import { useState } from 'react'
import { CategorySelector } from '../categorySelector/CategorySelector'
import styles from './expenseForm.module.css'
import { IconPath } from '../utilComponents/icon/IconPath'
import {
    IconButton,
    IconButtonProps,
} from '../utilComponents/buttonIcon/ButtonIcon'
import { categoriesSelector, addCategory, Expense } from '@/app/expenseSlice'
import { useAppDispatch, useAppSelector } from '@/app/hook'

type ExpenseRecord = Pick<Expense, 'amount' | 'categoryId'>

type ExpenseFormProps = {
    direction: 'row' | 'column'
    isFormButtonMinified?: boolean
    onCancelSubmit?: () => void
    recordValue?: Expense
}

interface NewExpenseFormProps extends ExpenseFormProps {
    recordValue: undefined
    onSubmit: (value: ExpenseRecord) => void
}

interface EditExpenseFormProps extends ExpenseFormProps {
    recordValue: Expense
    onSubmit: (value: Expense) => void
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
}: NewExpenseFormProps | EditExpenseFormProps) {
    const dispatch = useAppDispatch()
    const categories = useAppSelector(categoriesSelector)
    const categoriesList = Object.values(categories.items)

    const [amount, setAmount] = useState(recordValue ? recordValue.amount : 0)
    const [categoryId, setSelectedCategoryId] = useState(
        recordValue ? recordValue.categoryId : -1
    )
    const minExpenseValue = 0.01

    const isButtonEnabled = (
        amountToVerify: number,
        categoryToVerify: number
    ) => {
        return (
            !isNaN(amountToVerify) &&
            amountToVerify >= minExpenseValue &&
            categoryToVerify !== -1 &&
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
        recordValue
            ? onSubmit({
                  id: recordValue.id,
                  categoryId: categoryId,
                  amount,
              })
            : onSubmit({ categoryId: categoryId, amount })
        setSelectedCategoryId(-1)
        setAmount(0)
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
                optionList={categoriesList}
                selectedId={categoryId}
                onSelect={(value) => setSelectedCategoryId(value)}
                onAddCategory={(value) => {
                    dispatch(addCategory(value))
                    setSelectedCategoryId(categoriesList.length)
                }}
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
                    isDisabled={!isButtonEnabled(amount, categoryId)}
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
