import { useState } from 'react'
import { IconPath } from '../utilComponents/icon/IconPath'
import styles from './inputTextField.module.css'
import IconButton from '../utilComponents/buttonIcon/ButtonIcon'
import { Category, EntityWithId } from '@/app/expenseSlice'

interface Props {
    placeholder: string
    onChange: (value: string) => void
    closeEditing: () => void
}

export function InputTextField({ placeholder, onChange, closeEditing }: Props) {
    const [userInput, setUserInput] = useState<string>('')

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            userInput.trim() !== '' && onChange(userInput)
            closeEditing()
        }
    }

    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder={placeholder}
                value={userInput}
                onInput={(e: React.BaseSyntheticEvent) => {
                    setUserInput(e.target.value)
                }}
                onKeyDown={handleKeyDown}
                className={styles.newOptionInput}
            />
            <IconButton
                svgPath={IconPath.xMark}
                onClick={closeEditing}
                type="basic"
            />
        </div>
    )
}
