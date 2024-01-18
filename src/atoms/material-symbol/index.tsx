import { CSSProperties } from 'react';

import { classNames } from 'pkg/utils';

import css from './styles.module.css';

export interface MaterialSymbolProps {
	variant: string;
	size?: number;
	fill?: boolean;
	weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
	grade?: -25 | 0 | 200;
}

export default function MaterialSymbol({
	variant,
	size = 1.8,
	fill = true,
	weight = 400,
	grade = 0,
}: MaterialSymbolProps): JSX.Element {
	const style = {
		'--size': `${size}rem`,
		'--fill': fill ? 1 : 0,
		'--wght': weight,
		'--grad': grade,
	} as CSSProperties;

	return (
		<i
			className={classNames(css.materialSymbol, 'material-symbols-rounded')}
			style={style}>
			{variant}
		</i>
	);
}
