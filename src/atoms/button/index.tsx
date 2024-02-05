import { PointerEvent, ReactNode } from 'react';

import * as objects from 'pkg/utils/objects';

import css from './styles.module.css';

interface ButtonProps {
	selected?: boolean;
	direction?: 'horizontal' | 'vertical';
	variant?: 'primary' | 'secondary' | 'outlined';
	children: ReactNode | ReactNode[];
	onClick?: (event: PointerEvent<HTMLButtonElement>) => void;
}

export function Button({
	children,
	onClick,

	direction,
	selected,
	variant = 'primary',

	...rest
}: ButtonProps): JSX.Element {
	const data = objects.filter(rest, (_, key: string) =>
		key.startsWith('data-')
	);

	const props = {
		...data,
		'data-variant': variant,
		'data-selected': selected,
		'data-direction': direction,
	};

	return (
		<button {...props} onClick={onClick} className={css.button}>
			{children}
		</button>
	);
}

interface ButtonGroupProps {
	contentAware?: boolean;
	children?: ReactNode | ReactNode[];
}

export function ButtonGroup({
	contentAware = true,
	children,
}: ButtonGroupProps): JSX.Element {
	return (
		<div data-content-aware={contentAware} className={css.buttonGroupWrapper}>
			<article className={css.buttonGroup}>{children}</article>
		</div>
	);
}
