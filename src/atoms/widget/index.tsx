import { Fragment, ReactNode, Suspense, lazy, useMemo } from 'react';

import { classNames } from 'pkg/utils';

import MaterialSymbol, { MaterialSymbolProps } from 'atoms/material-symbol';
import Portal from 'atoms/portal';

import { useApplicationState } from 'views/application/state';

import css from './styles.module.css';

interface WidgetProps {
	id: string;
	guid: string;
	name: string;
	path?: string;
	symbol?: MaterialSymbolProps;
	children: ReactNode | ReactNode[];
}

export default function Widget({
	id,
	name,
	path,
	symbol,
	children,
}: WidgetProps): JSX.Element {
	const { sidebar, setSidebar, isActiveWidget, setActiveWidget } =
		useApplicationState();

	const showingWidgetSettings =
		sidebar === 'widget:settings' && isActiveWidget(id);

	if (!symbol) {
		symbol = {
			variant: 'new_releases',
		};
	}

	const AutoLoadSettings = useMemo(
		() =>
			lazy(() => {
				return import(`../../widgets/${path}/settings.tsx`);
			}),
		[path]
	);

	const toggleWidgetSettings = () => {
		setSidebar('widget:settings');
		setActiveWidget(id);
	};

	return (
		<Fragment>
			<article id={id} role="application" className={css.wrapper}>
				<header className={classNames(css.header, 'widget-drag-handle')}>
					<figure>
						<MaterialSymbol {...symbol} />
					</figure>
					<var>{name}</var>
					<span />
				</header>
				<button className={css.action} onClick={toggleWidgetSettings}>
					<MaterialSymbol variant="page_info" size={1.4} />
				</button>
				<main className={css.main}>{children}</main>
			</article>

			<Portal
				portalKey={id}
				selector="#widget-settings-portal"
				condition={showingWidgetSettings}>
				{showingWidgetSettings && (
					<section className={css.widgetSettings}>
						<Suspense fallback={<p>Loading Widget Settings...</p>}>
							<AutoLoadSettings />
						</Suspense>
					</section>
				)}
			</Portal>
		</Fragment>
	);
}
