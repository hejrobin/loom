import { pkg } from 'config';

import css from './styles.module.css';

export default function About(): JSX.Element {
	return (
		<section style={{ justifyContent: 'center' }}>
			<p className={css.disclaimer}>
				Powered by <strong>Loom v{pkg.version}</strong>
			</p>
		</section>
	);
}
