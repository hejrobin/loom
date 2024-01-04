import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Application from 'views/application';

import './styles.css';

// Do not remove the bang (!), it's a non-null assertion operator.
const mountNode: HTMLElement = document.getElementById('root')!;

createRoot(mountNode).render(
	<StrictMode>
		<Application />
	</StrictMode>
);
