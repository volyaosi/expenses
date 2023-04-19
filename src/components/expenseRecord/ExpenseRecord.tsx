import styles from './expenseRecord.module.css'
import { ExpenseForm } from '../expenseForm/ExpenseForm'
import { useState } from 'react'
import Icon from '../icon/Icon'
import { IconPath } from '../icon/IconPath'
import { ExpenseRecord, editExpenseRecord } from 'store/expenseSlice'
import { useAppDispatch } from '@/hook'

export const ExpenseRecordComponent: React.FC<
    ExpenseRecord & { index: number }
> = ({ category, amount, index }) => {
    const dispatch = useAppDispatch()
    const [isEditingMode, setEditingMode] = useState(false)

    if (isEditingMode) {
        return (
            <ExpenseForm
                direction="row"
                submitButtonTitle="Update"
                onSubmit={(record) => {
                    dispatch(editExpenseRecord({ record, index }))
                    setEditingMode(false)
                }}
                recordValue={{ category, amount }}
            />
        )
    }
    return (
        <div className={styles.containerGrid}>
            <div>
                <span>{index + 1}. </span>
                <span>{category}</span>
            </div>
            <span className={styles.amount}>${amount}</span>
            <div onClick={() => setEditingMode(true)}>
                <Icon svgPath={IconPath.pencilSquare} />
            </div>
        </div>
    )
}
