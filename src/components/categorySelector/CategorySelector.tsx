import { useState } from 'react'
import Icon from '../icon/Icon'
import { IconPath } from '../icon/IconPath'
import styles from './categorySelector.module.css'

export default function CategorySelector(props: {
	optionList: string[]
	selectedOption?: string
	onSelect: (category: string) => void
	onAddCategory: (newCategory: string) => void
}) {
	const [isOpen, setIsOpen] = useState(false)
	const [addCategoryMode, setAddCategoryMode] = useState(false)
	const [newCategoryName, setNewCategoryName] = useState('')

	const handleAddClick = () => {
		setIsOpen(false)
		setAddCategoryMode(false)
		props.onAddCategory(newCategoryName)
		setNewCategoryName('')
	}

	const title = props.selectedOption ?? 'Select category'

	return (
		<div>
			{!addCategoryMode ? (
				<div className={styles.container}>
					<div onClick={() => setIsOpen(!isOpen)} className={styles.listButton}>
						<span>{title}</span>
						<Icon
							svgPath={isOpen ? IconPath.chevronUp : IconPath.chevronDown}
						/>
					</div>

					{isOpen && (
						<DropdownList
							optionList={props.optionList}
							onSetCategoryMode={() => setAddCategoryMode(true)}
							onSelect={(category) => {
								props.onSelect(category)
								setIsOpen(false)
							}}
						/>
					)}
				</div>
			) : (
				<InputTextField
					value={newCategoryName}
					onChange={setNewCategoryName}
					closeEditing={handleAddClick}
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
				<div className={styles.addOption} onClick={props.onSetCategoryMode}>
					+ New Category
				</div>
			</div>
		</div>
	)
}

function InputTextField(props: {
	value: string
	onChange: (val: string) => void
	closeEditing: () => void
}) {
	return (
		<div className={styles.newCategoryContainer}>
			<input
				type="text"
				placeholder="Add your category"
				value={props.value}
				onChange={(e) => props.onChange(e.target.value)}
				className={styles.newCategoryInput}
			/>
			<div onClick={props.closeEditing}>
				<Icon svgPath={IconPath.xMark} />
			</div>
		</div>
	)
}
