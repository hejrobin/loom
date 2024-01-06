import { project } from 'config';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'widgets';

import { Application, ApplicationStateProvider } from 'views/application';

import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';

import './styles.css';
import './theme.css';

// Do not remove the bang (!), it's a non-null assertion operator.
const mountNode: HTMLElement = document.getElementById('root')!;

// Change this if you want, but keep it in project
document.title = `${project.name} v${project.version}`;

createRoot(mountNode).render(
	<StrictMode>
		<ApplicationStateProvider>
			<Application />
		</ApplicationStateProvider>
	</StrictMode>
);
