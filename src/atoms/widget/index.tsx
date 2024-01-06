import { ReactNode } from 'react';

import { classNames } from 'pkg/helpers';

import MaterialSymbol from 'atoms/material-symbol';

import css from './styles.module.css';

interface WidgetProps {
	id: string;
	name: string;
	icon?: string;
	children: ReactNode | ReactNode[];
}

export default function Widget({
	id,
	name,
	icon,
	children,
}: WidgetProps): JSX.Element {
	return (
		<article id={id} role="application" className={css.wrapper}>
			<header className={classNames(css.header, 'widget-drag-handle')}>
				<figure>
					<MaterialSymbol variant={icon ?? 'verified'} />
				</figure>
				<var>{name}</var>
				<button className={css.action}>
					<MaterialSymbol variant="more_horiz" size={1.4} />
				</button>
			</header>
			<main className={css.main}>{children}</main>
		</article>
	);
}
