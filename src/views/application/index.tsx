import { project } from 'config';
import { ReactNode, createContext } from 'react';

import useMixedState from 'pkg/mixed-state';
import {
	WidgetIdentifier,
	WidgetInstance,
	WidgetInstanceId,
	getWidgetManifest,
	instanciateWidget,
} from 'pkg/widget';
import WidgetProvider from 'pkg/widget/provider';

import MaterialSymbol from 'atoms/material-symbol';

import { useApplicationState } from 'views/application/state';

import css from './styles.module.css';

const NoOpFn = () => null;

export type ApplicationColorScheme = 'dark' | 'light' | 'system';

type ActionInstanciateWidget = (guid: WidgetIdentifier) => void;

type ActionRemoveWidge = (instanceId: WidgetInstanceId) => void;

type ActionUpdateWidgets = (widgets: WidgetInstance[]) => void;

export interface ApplicationState {
	colorScheme: ApplicationColorScheme;
	setColorScheme: (colorScheme: ApplicationColorScheme) => void;

	widgets: WidgetInstance[];
	addWidget: ActionInstanciateWidget;
	removeWidget: ActionRemoveWidge;
	updateWidgets: ActionUpdateWidgets;
}

const DefaultApplicationState: ApplicationState = {
	colorScheme: 'system',
	setColorScheme: () => null,

	widgets: [],
	addWidget: NoOpFn,
	removeWidget: NoOpFn,
	updateWidgets: NoOpFn,
};

export const ApplicationContext = createContext<ApplicationState>(
	DefaultApplicationState
);

interface ApplicationProviderProps {
	initialState?: Partial<ApplicationState>;
	children: ReactNode | ReactNode[];
}

export function ApplicationStateProvider({
	initialState,
	children,
}: ApplicationProviderProps): JSX.Element {
	const [state, setState] = useMixedState<ApplicationState>({
		...DefaultApplicationState,
		...initialState,
	});

	const setColorScheme = (colorScheme: ApplicationColorScheme) =>
		setState({ colorScheme });

	const addWidget = (guid: WidgetIdentifier): void => {
		const manifest = getWidgetManifest(guid);

		if (manifest) {
			setState({
				widgets: state.widgets.concat(instanciateWidget(manifest)),
			});
		}
	};

	const removeWidget = (instanceId: WidgetInstanceId) => {
		setState({
			widgets: state.widgets.filter((w: WidgetInstance) => w.i !== instanceId),
		});
	};

	const updateWidgets = (widgets: WidgetInstance[]) => {
		let nextWidgets = [...widgets];

		nextWidgets = nextWidgets.map((item: WidgetInstance) => {
			const prev = state.widgets.find((i: WidgetInstance) => i.i === item.i);

			if (prev) {
				item.guid = prev.guid;
			}

			return item;
		});

		setState({ widgets: nextWidgets });
	};

	const providedState = {
		...state,

		setColorScheme,

		addWidget,
		removeWidget,
		updateWidgets,
	};

	return (
		<ApplicationContext.Provider value={providedState}>
			{children}
		</ApplicationContext.Provider>
	);
}

export function Application(): JSX.Element {
	const { addWidget } = useApplicationState();

	return (
		<main className={css.wrapper}>
			<header className={css.header}>
				<MaterialSymbol variant="view_cozy" />
				<h1>
					{project.name} v{project.version}
				</h1>
			</header>
			<nav className={css.actions}>
				<a
					href="#"
					className={css.action}
					onClick={() => addWidget('widgets.test')}
				>
					<MaterialSymbol variant="add" />
				</a>
			</nav>
			<div className={css.widgets}>
				<WidgetProvider />
			</div>
		</main>
	);
}
