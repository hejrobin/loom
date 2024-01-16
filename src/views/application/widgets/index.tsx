import { Fragment } from 'react';

import { WidgetManifest, getRegisteredWidgets } from 'pkg/widget';

import { useApplicationState } from 'views/application/state';

import css from './styles.module.css';

export default function Widgets(): JSX.Element {
	const widgets = getRegisteredWidgets();
	const { addWidget } = useApplicationState();

	const available = Array.from(widgets.values());

	if (available.length === 0) {
		return <Fragment />;
	}

	return (
		<section style={{ gap: '1rem' }}>
			{available.map((widget: WidgetManifest) => (
				<div className={css.widget} onClick={() => addWidget(widget.guid)}>
					<p className={css.widgetHeader}>
						<span className={css.widgetName}>{widget.name}</span>
						<var className={css.widgetVersion}>(v{widget.version})</var>
					</p>
					<p className={css.widgetAuthor}>{widget.author}</p>
					<p className={css.widgetSummary}>{widget.summary}</p>
				</div>
			))}
		</section>
	);
}
