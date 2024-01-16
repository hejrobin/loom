import { Fragment, ReactNode, Suspense, lazy, useMemo, useRef } from 'react';

import { classNames } from 'pkg/utils';

import { Button } from 'atoms/button';
import MaterialSymbol from 'atoms/material-symbol';

import { useApplicationState } from 'views/application/state';

import css from './styles.module.css';

interface WidgetProps {
	id: string;
	name: string;
	icon?: string;
	path?: string;
	children: ReactNode | ReactNode[];
}

export default function Widget({
	id,
	name,
	icon,
	path,
	children,
}: WidgetProps): JSX.Element {
	const { removeWidget } = useApplicationState();
	const settingsRef = useRef<HTMLDialogElement>(null);

	const handleOpenSettings = () => {
		settingsRef.current?.showModal();
	};

	const handleCloseSettings = () => {
		settingsRef.current?.close();
	};

	const handleRemoveWidget = () => {
		handleCloseSettings();
		removeWidget(id);
	};

	const AutoLoadSettings = useMemo(
		() =>
			lazy(() => {
				return import(`../../widgets/${path}/settings.tsx`);
			}),
		[]
	);

	return (
		<Fragment>
			<article id={id} role="application" className={css.wrapper}>
				<header className={classNames(css.header, 'widget-drag-handle')}>
					<figure>
						<MaterialSymbol variant={icon ?? 'verified'} />
					</figure>
					<var>{name}</var>
					<span />
				</header>
				<button className={css.action} onClick={handleOpenSettings}>
					<MaterialSymbol variant="more_horiz" size={1.4} />
				</button>
				<main className={css.main}>{children}</main>
			</article>

			<dialog ref={settingsRef} className={css.settings}>
				<header className={classNames(css.header, css.settingsHeader)}>
					<figure>
						<MaterialSymbol variant="discover_tune" />
					</figure>
					<var>{name} Settings</var>
					<span />
				</header>
				<button onClick={handleCloseSettings} className={css.action}>
					<MaterialSymbol variant="close" size={1.4} />
				</button>
				<main className={css.settingsWrapper}>
					<Suspense fallback={<p>Loading Widget Settings...</p>}>
						<AutoLoadSettings />
					</Suspense>
					<Button onClick={handleRemoveWidget}>
						<span>Remove Widget</span>
					</Button>
				</main>
			</dialog>
		</Fragment>
	);
}
