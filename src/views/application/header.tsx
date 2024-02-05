import MaterialSymbol from 'atoms/material-symbol';

import css from './styles.module.css';

export default function Header(): JSX.Element {
	return (
		<header className={css.header}>
			<MaterialSymbol variant="dashboard" />
			<h1>Loom</h1>
		</header>
	);
}
