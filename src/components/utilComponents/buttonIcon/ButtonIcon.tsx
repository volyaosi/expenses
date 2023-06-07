import Icon from '../icon/Icon'
import styles from './ButtonIcon.module.css'

export interface IconButtonProps {
    svgPath: string
    onClick: () => void
    type: 'success' | 'basic'
    isDisabled?: boolean
}

export function IconButton({
    svgPath,
    onClick,
    type,
    isDisabled,
}: IconButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`${styles.buttonIcon} ${
                !isDisabled &&
                (type === 'success' ? styles.successIcon : styles.basicIcon)
            } ${isDisabled && styles.disabledIcon}`}
            disabled={isDisabled}
        >
            <Icon svgPath={svgPath} />
        </button>
    )
}