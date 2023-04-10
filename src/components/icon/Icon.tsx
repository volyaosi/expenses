import styles from './icon.module.css'

interface IconProps {
	svgPath: string
}

export default function Icon({ svgPath }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className={styles.icon}
		>
			<path strokeLinecap="round" strokeLinejoin="round" d={svgPath} />
		</svg>
	)
}
