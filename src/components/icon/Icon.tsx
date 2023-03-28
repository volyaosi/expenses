import styles from './icon.module.css'

export default function CategorySelector(props: { svgPath: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className={styles.icon}
		>
			<path strokeLinecap="round" strokeLinejoin="round" d={props.svgPath} />
		</svg>
	)
}
