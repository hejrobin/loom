import { ReactNode, createContext } from 'react';

import useMixedState from 'pkg/mixed-state';

import { useApplicationColorScheme } from 'views/application/state';

export type ApplicationColorScheme = 'dark' | 'light' | 'system';

export interface ApplicationState {
	colorScheme: ApplicationColorScheme;
	setColorScheme: (colorScheme: ApplicationColorScheme) => void;
}

const DefaultApplicationState: ApplicationState = {
	colorScheme: 'system',
	setColorScheme: () => null,
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

	const providedState = {
		...state,

		setColorScheme,
	};

	return (
		<ApplicationContext.Provider value={providedState}>
			{children}
		</ApplicationContext.Provider>
	);
}

export function Application(): JSX.Element {
	const [, setColorScheme] = useApplicationColorScheme();

	return (
		<main>
			<ul>
				<li onClick={() => setColorScheme('system')}>system</li>
				<li onClick={() => setColorScheme('dark')}>dark</li>
				<li onClick={() => setColorScheme('light')}>light</li>
			</ul>
		</main>
	);
}
