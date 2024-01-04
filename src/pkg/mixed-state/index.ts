import { useReducer } from 'react';

enum ActionType {
	SET = 'mixedState/SET',
	OVERRIDE = 'mixedState/OVERRIDE',
}

interface Action<T> {
	type: ActionType;
	payload: Partial<T>;
}

interface DefaultState {
	[key: string]: unknown;
}

export type MixedStateSetter<T> = (payload: Partial<T>) => void;

export type MixedStateOverrider<T> = (payload: T) => void;

export default function useMixedState<T = DefaultState>(
	initialState: T
): [T, MixedStateSetter<T>, MixedStateOverrider<T>] {
	const reducer = (state: T, action: Action<T>): T => {
		switch (action.type) {
			case ActionType.SET:
				return { ...state, ...action.payload };
			case ActionType.OVERRIDE:
				return { ...action.payload } as T;
		}
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const setter = (payload: Partial<T>) => {
		dispatch({
			type: ActionType.SET,
			payload,
		});
	};

	const overrider = (payload: T) => {
		dispatch({
			type: ActionType.OVERRIDE,
			payload,
		});
	};

	return [state, setter, overrider];
}
