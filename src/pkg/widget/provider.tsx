import { Suspense, lazy, useMemo } from 'react';
import ReactGridLayout, {
	ReactGridLayoutProps,
	WidthProvider,
} from 'react-grid-layout';

import { WidgetInstance, getWidgetManifest } from 'pkg/widget';

import Widget from 'atoms/widget';

import { useApplicationState } from 'views/application/state';

const GridLayout = WidthProvider(ReactGridLayout);

interface WidgetLoaderProps {
	instanceId: string;
	guid: string;
}

function WidgetLoader({ instanceId, guid }: WidgetLoaderProps): JSX.Element {
	const manifest = getWidgetManifest(guid);

	const AutoLoader = useMemo(
		() =>
			lazy(() => {
				return import(`../../widgets/${manifest?.path}/index.tsx`);
			}),
		[manifest?.path]
	);

	return (
		<Widget
			id={instanceId}
			path={manifest?.path}
			name={manifest?.name as string}
		>
			<Suspense fallback={<p>Loading Widget...</p>}>
				<AutoLoader />
			</Suspense>
		</Widget>
	);
}

export default function WidgetProvider(): JSX.Element {
	const { widgets, updateWidgets } = useApplicationState();

	const settings: ReactGridLayoutProps = {
		cols: 12,
		rowHeight: 35,
		margin: [20, 20],
		containerPadding: [0, 0],
		draggableHandle: '.widget-drag-handle',
		layout: widgets,
	};

	return (
		<GridLayout {...settings} onLayoutChange={updateWidgets}>
			{widgets.map((widget: WidgetInstance) => {
				return (
					<div
						key={widget.i}
						data-grid={{
							...widget,
							resizeHandles: ['se'],
						}}
					>
						<WidgetLoader instanceId={widget.i} guid={widget.guid} />
					</div>
				);
			})}
		</GridLayout>
	);
}
