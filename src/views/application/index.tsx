import { AnimatePresence, motion } from 'framer-motion';
import { Fragment, PointerEvent, ReactNode, createContext } from 'react';

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

import Header from 'views/application/header';
import About from 'views/application/settings/about';
import DisplayModeSettings from 'views/application/settings/display-mode';
import {
	useApplicationColorScheme,
	useApplicationState,
} from 'views/application/state';
import Widgets from 'views/application/widgets';

import css from './styles.module.css';

const NoOpFn = () => null;

export type ApplicationColorScheme = 'dark' | 'light' | 'system';

type ActionSetApplicationColorScheme = (
	colorScheme: ApplicationColorScheme
) => void;

type ActionInstanciateWidget = (guid: WidgetIdentifier) => void;

type ActionRemoveWidge = (instanceId: WidgetInstanceId) => void;

type ActionUpdateWidgets = (widgets: WidgetInstance[]) => void;

type Sidebar = 'none' | 'settings' | 'widgets' | 'widget:settings';

type ActionSetSidebar = (sidebar: Sidebar) => void;

export interface ApplicationState {
	colorScheme: ApplicationColorScheme;
	setColorScheme: ActionSetApplicationColorScheme;

	widgets: WidgetInstance[];
	addWidget: ActionInstanciateWidget;
	removeWidget: ActionRemoveWidge;
	updateWidgets: ActionUpdateWidgets;
	activeWidget: Nullable<string>;
	setActiveWidget: (widgetInstanceId: Nullable<WidgetInstanceId>) => void;
	isActiveWidget: (widgetInstanceId: WidgetInstanceId) => boolean;

	sidebar?: Sidebar;
	setSidebar: ActionSetSidebar;
}

const DefaultApplicationState: ApplicationState = {
	colorScheme: 'system',
	setColorScheme: NoOpFn,

	widgets: [],
	addWidget: NoOpFn,
	removeWidget: NoOpFn,
	updateWidgets: NoOpFn,
	activeWidget: null,
	setActiveWidget: NoOpFn,
	isActiveWidget: () => false,

	sidebar: 'none',
	setSidebar: NoOpFn,
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

	const setSidebar = (sidebar: Sidebar) => {
		setState({ sidebar, activeWidget: null });
	};

	const setActiveWidget = (widgetInstanceId: Nullable<WidgetInstanceId>) => {
		setState({ activeWidget: widgetInstanceId });
	};

	const isActiveWidget = (widgetInstanceId: WidgetInstanceId): boolean => {
		return state.activeWidget === widgetInstanceId;
	};

	const providedState = {
		...state,

		setColorScheme,

		addWidget,
		removeWidget,
		updateWidgets,
		setActiveWidget,
		isActiveWidget,

		setSidebar,
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
	children: ReactNode | ReactNode[];
}

function Drawer({
	title,
	children,
	...symbolProperties
}: DrawerProps): JSX.Element {
	const { setSidebar } = useApplicationState();

	const handleClose = () => setSidebar('none');

	return (
		<motion.aside
			initial={{ opacity: 0, x: '100%' }}
			animate={{ opacity: 1, x: '0%' }}
			exit={{ opacity: 0, x: '100%' }}
			transition={{ ease: 'easeInOut' }}
			className={css.settings}>
			<section
				style={{
					gap: '1rem',
					alignItems: 'center',
					gridTemplateColumns: 'auto 1fr auto',
				}}>
				<Action {...symbolProperties} onClick={handleClose} />
				<h1>{title}</h1>
				<Action variant="close" onClick={handleClose} />
			</section>
			{children}
		</motion.aside>
	);
}

export function Application(): JSX.Element {
	const { sidebar, setSidebar } = useApplicationState();

	const openWidgetsSidebar = () => setSidebar('widgets');
	const openSettingsSidebar = () => setSidebar('settings');

	// Makes sure last saved color scheme is set
	useApplicationColorScheme();

	return (
		<Fragment>
			<main className={css.wrapper}>
				<Header />
				<nav className={css.actions}>
					<Action variant="add_circle" onClick={openWidgetsSidebar} />
					<Action
						variant="page_info"
						weight={300}
						fill={false}
						onClick={openSettingsSidebar}
					/>
				</nav>
				<div className={css.widgets}>
					<WidgetProvider />
				</div>
			</main>
			<AnimatePresence>
				{sidebar === 'settings' && (
					<Drawer
						key="settings"
						title="Settings"
						variant="page_info"
						weight={300}
						fill={false}>
						<DisplayModeSettings />
						<About />
					</Drawer>
				)}

				{sidebar === 'widgets' && (
					<Drawer key="widgets" title="Widgets" variant="widgets" weight={300}>
						<Widgets />
					</Drawer>
				)}

				{sidebar === 'widget:settings' && (
					<Drawer
						key="widget:settings"
						title="Widget Settings"
						variant="page_info"
						weight={300}
						fill={false}>
						<div id="widget-settings-portal" />
					</Drawer>
				)}
			</AnimatePresence>
		</Fragment>
	);
}
