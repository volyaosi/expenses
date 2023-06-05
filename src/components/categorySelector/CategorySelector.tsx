import { useState } from 'react'
import { Category } from '@/app/expenseSlice'
import { EditableDropdown } from '../editableDropdown/EditableDropdown'
import { InputTextField } from '../InputTextField/InputTextField'

interface Props {
    optionList: Category[]
    selectedId?: number
    onSelect: (id: number) => void
    onAddCategory: (newCategory: string) => void
}

export function CategorySelector({
    optionList,
    selectedId,
    onSelect,
    onAddCategory,
}: Props) {
    const [addCategoryMode, setAddCategoryMode] = useState(false)

    const addNewCategory = (newCategory: string) => {
        onAddCategory(newCategory)
    }

    if (addCategoryMode) {
        return (
            <InputTextField
                onChange={addNewCategory}
                closeEditing={() => setAddCategoryMode(false)}
                placeholder="Add your category"
            />
        )
    }

    return (
        <EditableDropdown<Category>
            title="category"
            optionList={optionList}
            onSetEditMode={() => {
                setAddCategoryMode(true)
            }}
            onSelect={onSelect}
            selectedId={selectedId}
            getStringValue={(option: Category) => option.name}
        />
    )
}
