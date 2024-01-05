import { Dispatch, useEffect, useState } from 'react';

export function usePersistentValue<T>(
	key: string,
	initialValue: T
): [T, Dispatch<T>] {
	const setter = () => {
		const value = localStorage.getItem(key);

		if (value !== null) {
			return JSON.parse(value);
		}

		localStorage.setItem(key, JSON.stringify(initialValue));
		window.dispatchEvent(new Event('storage'));

		return initialValue;
	};

	const [state, setState] = useState(setter);

	useEffect(() => {
		localStorage.setItem(key, state);
		window.dispatchEvent(new Event('storage'));
	}, [key, state]);

	useEffect(() => {
		const listenStorageChange = () => {
			setState(setInterval);
		};

		window.addEventListener('storage', listenStorageChange);

		return () => window.removeEventListener('storage', listenStorageChange);
	}, []);

	return [state as T, setState];
}
