import { ReactNode, ReactPortal, useState } from 'react';
import { createPortal } from 'react-dom';

import { useEffectOnce } from 'pkg/component-lifecycle';

interface PortalProps {
	portalKey?: string;
	selector: string;
	condition?: boolean;

	children: ReactNode | ReactNode[];
}

export default function Portal({
	portalKey = Date.now().toString(),
	selector,
	condition,
	children,
}: PortalProps): ReactPortal | ReactNode {
	const [targetNode, setTargetNode] = useState<Nullable<Element>>(null);

	useEffectOnce(() => {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation: MutationRecord) => {
				if (!mutation.addedNodes) return;

				const mountNode = document.querySelector(selector);

				if (mountNode && !targetNode) {
					setTargetNode(mountNode);
				}
			});
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		return () => {
			observer.disconnect();
		};
	});

	if (!targetNode || condition !== true) {
		return null;
	}

	return createPortal(children, targetNode!, portalKey);
}
