import {
	Fragment,
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { createPortal } from 'react-dom';

function getSuspensePortalId(id: string): string {
	return `suspense-portal-${id}`;
}

interface SuspensePortalProperties {
	id: string;
	children: ReactNode | ReactNode[];
	observeNode?: HTMLElement | DocumentFragment;
}

export function SuspensePortal({
	id,
	children,
	observeNode = document.body,
}: SuspensePortalProperties): JSX.Element {
	const targetSelector = `#${getSuspensePortalId(id)}`;
	const [targetNode, setTargetNode] = useState<HTMLElement | null>();

	const setTargetNodeIfExists = useCallback(() => {
		const portalTargetNode: HTMLElement | null =
			document.querySelector(targetSelector);

		if (portalTargetNode! && !targetNode) {
			setTargetNode(portalTargetNode);
		}
	}, [targetNode, targetSelector]);

	const observer = useMemo(() => {
		return new MutationObserver((mutations) => {
			mutations.forEach((mutation: MutationRecord) => {
				if (!mutation.addedNodes) return;

				setTargetNodeIfExists();
			});
		});
	}, [setTargetNodeIfExists]);

	useEffect(() => {
		observer.observe(observeNode, {
			childList: true,
			subtree: true,
		});

		setTargetNodeIfExists();
	}, [observer, observeNode, setTargetNodeIfExists]);

	if (!targetNode) {
		return <Fragment />;
	}

	return createPortal(children, targetNode!);
}

interface SuspensePortalEntryProperties {
	portalId: string;
}

export function SuspensePortalEntry({
	portalId,
}: SuspensePortalEntryProperties): JSX.Element {
	return <div id={getSuspensePortalId(portalId)} />;
}
