import styles from './expenseRecord.module.css'
import { ExpenseForm } from '../expenseForm/ExpenseForm'
import { Category, Expense } from '@/app/expenseSlice'
import { useState } from 'react'
import IconButton from '../utilComponents/buttonIcon/ButtonIcon'
import { IconPath } from '../utilComponents/icon/IconPath'
import { useAppDispatch } from '@/app/hook'

type ExpenseRecordProps = {
    category: Category['name']
    record: Expense
}

export const ExpenseRecord = ({ category, record }: ExpenseRecordProps) => {
    const dispatch = useAppDispatch()
    const [isEditingMode, setEditingMode] = useState(false)

    if (isEditingMode) {
        return (
            <div className={styles.formContainer}>
                <ExpenseForm
                    direction="row"
                    onSubmit={(record) => {
                        // dispatch(editExpenseRecord({ record, index }))
                        setEditingMode(false)
                    }}
                    recordValue={record}
                    isFormButtonMinified={true}
                    onCancelSubmit={() => setEditingMode(false)}
                />
            </div>
        )
    }
    return (
        <div className={styles.containerGrid}>
            <div>
                <span>{record.id + 1}. </span>
                <span>{category}</span>
            </div>
            <span className={styles.amount}>${record.amount}</span>
            <IconButton
                svgPath={IconPath.pencil}
                onClick={() => setEditingMode(true)}
                type="basic"
            />
        </div>
    )
}
