import { pkg } from 'config';

import Widget from 'atoms/widget';

export default function Application(): JSX.Element {
	return (
		<article>
			<h1>
				{pkg.name} v{pkg.version}
			</h1>

			<Widget guid="foo:bar:widget:1" name="Test Widget Foo">
				<p>Hello World! I'm a Widget!</p>
			</Widget>
		</article>
	);
}
