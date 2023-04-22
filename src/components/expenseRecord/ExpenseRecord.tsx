import styles from './expenseRecord.module.css'
import { ExpenseForm } from '../expenseForm/ExpenseForm'
import { useState } from 'react'
import { IconPath } from '../utilComponents/icon/IconPath'
import { ExpenseRecord, editExpenseRecord } from 'store/expenseSlice'
import { useAppDispatch } from '@/hook'
import IconButton from '../utilComponents/buttonIcon/ButtonIcon'

export const ExpenseRecordComponent: React.FC<
    ExpenseRecord & { index: number }
> = ({ category, amount, index }) => {
    const dispatch = useAppDispatch()
    const [isEditingMode, setEditingMode] = useState(false)

    if (isEditingMode) {
        return (
            <div className={styles.formContainer}>
                <ExpenseForm
                    direction="row"
                    submitButtonTitle="Update"
                    onSubmit={(record) => {
                        dispatch(editExpenseRecord({ record, index }))
                        setEditingMode(false)
                    }}
                    recordValue={{ category, amount }}
                    isSubmitButtonMinified={true}
                />
                <div className={styles.cancelButton}>
                    <IconButton
                        svgPath={IconPath.xMark}
                        onClick={() => setEditingMode(false)}
                        type="basic"
                    />
                </div>
            </div>
        )
    }
    return (
        <div className={styles.containerGrid}>
            <div>
                <span>{index + 1}. </span>
                <span>{category}</span>
            </div>
            <span className={styles.amount}>${amount}</span>
            <IconButton
                svgPath={IconPath.pencil}
                onClick={() => setEditingMode(true)}
                type="basic"
            />
        </div>
    )
}
