import { useState } from 'react'
import { IconPath } from '../utilComponents/icon/IconPath'
import styles from './categorySelector.module.css'
import IconButton from '../utilComponents/buttonIcon/ButtonIcon'

interface CategorySelectorProps {
    optionList: string[]
    selectedOption?: string
    onSelect: (category: string | undefined) => void
    onAddCategory: (newCategory: string) => void
}
interface DropdownListProps<T> {
    optionList: T[]
    selectedOption?: T
    onSelect: (option: string) => void
    onSetCategoryMode: () => void
}

interface InputTextFieldProps {
    onChange: (value: string) => void
    closeEditing: () => void
}

export default function CategorySelector({
    optionList,
    selectedOption,
    onSelect,
    onAddCategory,
}: CategorySelectorProps) {
    const [addCategoryMode, setAddCategoryMode] = useState(false)

    const addNewCategory = (newCategory: string) => {
        onAddCategory(newCategory)
        onSelect(newCategory)
    }

    if (addCategoryMode) {
        return (
            <InputTextField
                onChange={addNewCategory}
                closeEditing={() => setAddCategoryMode(false)}
            />
        )
    }
    return (
        <DropdownList
            optionList={optionList}
            onSetCategoryMode={() => {
                setAddCategoryMode(true)
            }}
            onSelect={onSelect}
            selectedOption={selectedOption}
        />
    )
}

function DropdownList<T extends string>({
    optionList,
    selectedOption,
    onSelect,
    onSetCategoryMode,
}: DropdownListProps<T>) {
    let currentValue = selectedOption || 'DEFAULT'

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === 'addNewCategory') {
            onSetCategoryMode()
        } else {
            onSelect(e.target.value)
        }
    }
    return (
        <select onChange={handleChange} value={currentValue}>
            <option className={styles.option} value="DEFAULT" disabled={true}>
                Select category
            </option>

            {optionList.map((option) => (
                <option key={option} className={styles.option} value={option}>
                    {option}
                </option>
            ))}
            <option className={styles.option} value="addNewCategory">
                + New Category
            </option>
        </select>
    )
}

function InputTextField({ onChange, closeEditing }: InputTextFieldProps) {
    const [userInput, setUserInput] = useState<string>('')

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            userInput.trim() !== '' && onChange(userInput)
            closeEditing()
        }
    }

    return (
        <div className={styles.newCategoryContainer}>
            <input
                type="text"
                placeholder="Add your category"
                value={userInput}
                onInput={(e: React.BaseSyntheticEvent) => {
                    setUserInput(e.target.value)
                }}
                onKeyDown={handleKeyDown}
                className={styles.newCategoryInput}
            />
            <IconButton
                svgPath={IconPath.xMark}
                onClick={closeEditing}
                type="basic"
            />
        </div>
    )
}
