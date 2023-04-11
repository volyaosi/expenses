import { ChangeEventHandler, useState } from 'react'
import Icon from '../icon/Icon'
import { IconPath } from '../icon/IconPath'
import styles from './categorySelector.module.css'

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
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === 'addNewCategory') {
            onSetCategoryMode()
        } else {
            onSelect(e.target.value)
        }
    }
    return (
        <select onChange={handleChange}>
            <option
                className={styles.option}
                disabled={true}
                selected={selectedOption === undefined}
            >
                Select category
            </option>

            {optionList.map((option) => (
                <option
                    key={option}
                    className={styles.option}
                    value={option}
                    selected={selectedOption === option}
                >
                    {option}
                </option>
            ))}
            <option className={styles.option} value="addNewCategory">
                + New Category
            </option>
        </select>
    )
}

function InputTextField(props: {
    onChange: (value: string) => void
    closeEditing: () => void
}) {
    const [userInput, setUserInput] = useState<string>('')

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            userInput.trim() !== '' && props.onChange(userInput)
            props.closeEditing()
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
            <div onClick={props.closeEditing}>
                <Icon svgPath={IconPath.xMark} />
            </div>
        </div>
    )
}
