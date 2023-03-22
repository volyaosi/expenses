export const CATEGORY_LIST = {
	DEFAULT: 'DEFAULT',
	HOUSING: 'Housing',
	TRANSPORTATION: 'Transportation',
	FOOD: 'Food',
	UTILITIES: 'Utilities',
	INSURANCE: 'Insurance',
	MEDICAL: 'Medical & Healthcare',
	SAVING: 'Saving & Investing',
	OTHER: 'Other',
} as const

export type Category = (typeof CATEGORY_LIST)[keyof typeof CATEGORY_LIST]
export type DefinedCategory = Exclude<Category, 'DEFAULT'>

export function isDefinedCategory(value: Category): value is DefinedCategory {
	return value !== 'DEFAULT'
}

export default function CategorySelector(props: {
	optionList: Category[]
	selectedOption: Category
	onSelect: (category: Category) => void
}) {
	return (
		<select
			value={props.selectedOption}
			onChange={(e) => props.onSelect(e.target.value as Category)}
		>
			{props.optionList.map((category, i) => {
				const isDefaultValue = !isDefinedCategory(category)

				return (
					<option value={category} key={i} disabled={isDefaultValue}>
						{isDefaultValue ? 'Select Category' : category}
					</option>
				)
			})}
		</select>
	)
}
