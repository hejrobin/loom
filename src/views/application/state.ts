import { Dispatch, useContext } from 'react';

import { useComponentDidMount } from 'pkg/component-lifecycle';

import {
	ApplicationColorScheme,
	ApplicationContext,
	ApplicationState,
} from 'views/application';

export function useApplicationState(): ApplicationState {
	return useContext(ApplicationContext);
}

interface ApplicationColorSchemeHook {
	colorScheme: ApplicationColorScheme;
	setColorScheme: Dispatch<ApplicationColorScheme>;
	isSystemMode: boolean;
	isLightMode: boolean;
	isDarkMode: boolean;
}

export function useApplicationColorScheme(): ApplicationColorSchemeHook {
	const __storageKey: string = 'loom:app:cs';

	const colorSchemeFromStorage: string =
		window.localStorage.getItem(__storageKey) ?? '';

	const initialColorScheme: ApplicationColorScheme =
		(colorSchemeFromStorage as ApplicationColorScheme) ?? 'system';

	const { colorScheme, setColorScheme } = useApplicationState();

	useComponentDidMount(() => {
		if (!!colorSchemeFromStorage && colorScheme !== colorSchemeFromStorage) {
			setColorScheme(initialColorScheme);

			document.documentElement.dataset.colorScheme = initialColorScheme;
		}
	});

	const dispatch = (colorScheme: ApplicationColorScheme) => {
		window.localStorage.setItem(__storageKey, colorScheme);
		document.documentElement.dataset.colorScheme = colorScheme;

		setColorScheme(colorScheme);
	};

	return {
		colorScheme,
		setColorScheme: dispatch,
		isSystemMode: colorScheme === 'system',
		isLightMode: colorScheme === 'light',
		isDarkMode: colorScheme === 'dark',
	};
}
