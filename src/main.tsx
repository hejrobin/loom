import { pkg } from 'config';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'widgets';
import './bootstrap';

import { Application, ApplicationStateProvider } from 'views/application';

import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';

import './styles.css';

// Do not remove the bang (!), it's a non-null assertion operator.
const mountNode: HTMLElement = document.getElementById('root')!;

// Change this if you want, but keep it in project
document.title = `${pkg.name} v${pkg.version}`;

createRoot(mountNode).render(
	<StrictMode>
		<ApplicationStateProvider>
			<Application />
		</ApplicationStateProvider>
	</StrictMode>
);
