import { useState } from 'react'
import Icon from '../icon/Icon'
import { IconPath } from '../icon/IconPath'
import styles from './categorySelector.module.css'

interface CategorySelectorProps {
    optionList: string[]
    selectedOption?: string
    onSelect: (category: string | undefined) => void
    onAddCategory: (newCategory: string) => void
}

export default function CategorySelector({
    optionList,
    selectedOption,
    onSelect,
    onAddCategory,
}: CategorySelectorProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [addCategoryMode, setAddCategoryMode] = useState(false)

    const addNewCategory = (newCategory: string) => {
        onAddCategory(newCategory)
        onSelect(newCategory)
    }
    const closeEditing = () => {
        setIsOpen(false)
        setAddCategoryMode(false)
    }

    const title = selectedOption ?? 'Select category'

    return (
        <div>
            {!addCategoryMode ? (
                <div className={styles.container}>
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className={styles.listButton}
                    >
                        <span>{title}</span>
                        <Icon
                            svgPath={
                                isOpen
                                    ? IconPath.chevronUp
                                    : IconPath.chevronDown
                            }
                        />
                    </div>

                    {isOpen && (
                        <DropdownList
                            optionList={optionList}
                            onSetCategoryMode={() => {
                                setAddCategoryMode(true)
                                onSelect(undefined)
                            }}
                            onSelect={(category) => {
                                onSelect(category)
                                setIsOpen(false)
                            }}
                        />
                    )}
                </div>
            ) : (
                <InputTextField
                    onChange={addNewCategory}
                    closeEditing={closeEditing}
                />
            )}
        </div>
    )
}

function DropdownList(props: {
    optionList: string[]
    onSelect: (option: string) => void
    onSetCategoryMode: () => void
}) {
    return (
        <div className={styles.optionList}>
            {props.optionList.map((option) => (
                <div
                    key={option}
                    className={styles.option}
                    onClick={() => props.onSelect(option)}
                >
                    {option}
                </div>
            ))}
            <div className={styles.option}>
                <div
                    className={styles.addOption}
                    onClick={props.onSetCategoryMode}
                >
                    + New Category
                </div>
            </div>
        </div>
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
