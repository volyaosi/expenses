export type Category =
	| undefined
	| 'Housing'
	| 'Transportation'
	| 'Food'
	| 'Utilities'
	| 'Insurance'
	| 'Medical & Healthcare'
	| 'Saving & Investing'
	| 'Other';

export type DefinedCategory = Exclude<Category, undefined>;

export default function CategorySelector(props: {
	optionList: Category[];
	selectedOption: Category;
	onSelect: (category: Category) => void;
}) {
	return (
		<select
			value={props.selectedOption}
			onChange={(e) => props.onSelect(e.target.value as Category)}
		>
			{props.optionList.map((category, i) => (
				<option value={category} key={i}>
					{category || 'Select Category'}
				</option>
			))}
		</select>
	);
}
