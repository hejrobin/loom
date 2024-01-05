import { CSSProperties } from 'react';

import { classNames } from 'pkg/helpers';

import css from './styles.module.css';

interface MaterialSymbolProps {
	variant: string;
	size?: number;
}

export default function MaterialSymbol({
	variant,
	size = 1.8,
}: MaterialSymbolProps): JSX.Element {
	return (
		<i
			className={classNames(css.materialSymbol, 'material-symbols-rounded')}
			style={{ '--size': `${size}rem` } as CSSProperties}
		>
			{variant}
		</i>
	);
}
