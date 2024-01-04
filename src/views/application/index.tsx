import { pkg } from 'config';

export default function Application(): JSX.Element {
	return (
		<h1>
			{pkg.name} v{pkg.version}
		</h1>
	);
}
