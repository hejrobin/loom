import { ReactNode } from 'react';

import MaterialSymbol from 'atoms/material-symbol';

import css from './styles.module.css';

interface WidgetProps {
	guid: string;
	name: string;
	icon?: string;
	children: ReactNode | ReactNode[];
}

export default function Widget({
	guid,
	name,
	icon,
	children,
}: WidgetProps): JSX.Element {
	return (
		<article id={guid} role="application" className={css.wrapper}>
			<header className={css.header}>
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
