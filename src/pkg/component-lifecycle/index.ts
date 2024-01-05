import { useEffect, useRef, useState } from 'react';

type Effect = () => void;

type AsyncEffect = () => Promise<void>;

export function useForceUpdate() {
	const [, s] = useState<number>(0);
	return () => s((v) => ++v);
}

export function useEffectOnce(effect: Effect): void {
	const destroyEffectRef = useRef<unknown>(undefined);
	const didCallEffectRef = useRef<boolean>(false);
	const renderAfterEffectRef = useRef<boolean>(false);

	const forceUpdate = useForceUpdate();

	if (didCallEffectRef.current) {
		renderAfterEffectRef.current = true;
	}

	useEffect(() => {
		if (!didCallEffectRef.current) {
			destroyEffectRef.current = effect();
			didCallEffectRef.current = true;
		}

		forceUpdate();

		return () => {
			// Ignore dummy useEffect issue with React 18.
			if (!renderAfterEffectRef.current) {
				return;
			}

			if (destroyEffectRef.current) {
				(destroyEffectRef.current as Effect)();
			}
		};
	});
}

export function useComponentDidMount(
	onMount: Effect | AsyncEffect,
	onUnmount?: Effect
): void {
	useEffectOnce(() => {
		onMount();

		if (onUnmount) {
			return onUnmount;
		}
	});
}

export function useComponentWillUnmount(onUnmount?: Effect): void {
	useEffectOnce(() => {
		return onUnmount ? onUnmount() : null;
	});
}
