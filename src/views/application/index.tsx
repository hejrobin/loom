import { AnimatePresence, motion } from 'framer-motion';
import {
	Fragment,
	PointerEvent,
	ReactNode,
	createContext,
	useState,
} from 'react';

import useMixedState from 'pkg/mixed-state';
import {
	WidgetIdentifier,
	WidgetInstance,
	WidgetInstanceId,
	getWidgetManifest,
	instanciateWidget,
} from 'pkg/widget';
import WidgetProvider from 'pkg/widget/provider';

import MaterialSymbol, { MaterialSymbolProps } from 'atoms/material-symbol';

import About from 'views/application/settings/about';
import DisplayModeSettings from 'views/application/settings/display-mode';
import Widgets from 'views/application/widgets';

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
	//const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

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

interface ActionProps extends MaterialSymbolProps {
	onClick: (event: PointerEvent<HTMLDivElement>) => void;
}

function Action({ onClick, ...symbolProperties }: ActionProps): JSX.Element {
	return (
		<div className={css.action} onClick={onClick}>
			<MaterialSymbol size={2.4} {...symbolProperties} />
		</div>
	);
}

interface DrawerProps extends MaterialSymbolProps {
	title: string;
	onClose: (event: PointerEvent<HTMLDivElement>) => void;
	children: ReactNode | ReactNode[];
}

function Drawer({
	title,
	onClose,
	children,
	...symbolProperties
}: DrawerProps): JSX.Element {
	return (
		<motion.aside
			initial={{ opacity: 0, x: '100%' }}
			animate={{ opacity: 1, x: '0%' }}
			exit={{ opacity: 0, x: '100%' }}
			transition={{ ease: 'easeInOut' }}
			className={css.settings}
		>
			<section
				style={{
					gap: '1rem',
					alignItems: 'center',
					gridTemplateColumns: 'auto 1fr auto',
				}}
			>
				<Action {...symbolProperties} onClick={onClose} />
				<h1>{title}</h1>
				<Action variant="close" onClick={onClose} />
			</section>
			{children}
		</motion.aside>
	);
}

export function Application(): JSX.Element {
	//const { addWidget } = useApplicationState();

	const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
	const [widgetsOpen, setWidgetsOpen] = useState<boolean>(false);

	const toggleSettingsOpen = () => setSettingsOpen(!settingsOpen);

	const toggleWidgetsOpen = () => setWidgetsOpen(!widgetsOpen);

	return (
		<Fragment>
			<main className={css.wrapper}>
				<header className={css.header}>
					<MaterialSymbol variant="raven" />
					<h1>Loom</h1>
				</header>
				<nav className={css.actions}>
					<Action variant="add_circle" onClick={toggleWidgetsOpen} />
					<Action
						variant="page_info"
						weight={300}
						fill={false}
						onClick={toggleSettingsOpen}
					/>
				</nav>
				<div className={css.widgets}>
					<WidgetProvider />
				</div>
			</main>
			<AnimatePresence>
				{settingsOpen && (
					<Drawer
						title="Settings"
						variant="page_info"
						weight={300}
						fill={false}
						onClose={toggleSettingsOpen}
					>
						<DisplayModeSettings />
						<About />
					</Drawer>
				)}
				{widgetsOpen && (
					<Drawer
						title="Widgets"
						variant="widgets"
						weight={300}
						onClose={toggleWidgetsOpen}
					>
						<Widgets />
					</Drawer>
				)}
			</AnimatePresence>
		</Fragment>
	);
}
