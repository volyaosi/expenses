import styles from './editableDropdown.module.css'
import { EntityWithId } from '@/app/expenseSlice'

interface Props<T> {
    title: string
    optionList: T[]
    selectedId?: number
    onSelect: (optionId: number) => void
    onSetEditMode: () => void
    getStringValue: (option: T) => string
}

export function EditableDropdown<T extends EntityWithId>({
    optionList,
    selectedId,
    title,
    onSelect,
    onSetEditMode,
    getStringValue,
}: Props<T>) {
    let currentValue = selectedId ?? -1

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(e.target.value)
        const isAddNewElementSelected = selectedId === optionList.length
        if (isAddNewElementSelected) {
            onSetEditMode()
        } else {
            onSelect(selectedId)
        }
    }
    return (
        <select onChange={handleChange} value={currentValue}>
            <option className={styles.option} value={-1} disabled={true}>
                Select {title}
            </option>

            {optionList.map((option) => (
                <option
                    key={option.id}
                    className={styles.option}
                    value={option.id}
                >
                    {getStringValue(option)}
                </option>
            ))}
            <option className={styles.option} value={optionList.length}>
                + New {title}
            </option>
        </select>
    )
}
