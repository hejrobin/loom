import { PointerEvent } from 'react';

import { Button, ButtonGroup } from 'atoms/button';
import MaterialSymbol from 'atoms/material-symbol';

import { ApplicationColorScheme } from 'views/application';
import { useApplicationColorScheme } from 'views/application/state';

export default function DisplayModeSettings(): JSX.Element {
	const { setColorScheme, isSystemMode, isLightMode, isDarkMode } =
		useApplicationColorScheme();

	const handleChangeColorScheme = (event: PointerEvent<HTMLButtonElement>) => {
		const colorScheme = event.currentTarget.dataset
			.colorScheme as ApplicationColorScheme;

		if (colorScheme) {
			setColorScheme(colorScheme);
		}
	};

	return (
		<section>
			<h2>Display Mode</h2>
			<ButtonGroup>
				<Button
					data-color-scheme="system"
					selected={isSystemMode}
					direction="vertical"
					variant="outlined"
					onClick={handleChangeColorScheme}>
					<MaterialSymbol
						size={3}
						fill={false}
						grade={-25}
						weight={300}
						variant="routine"
					/>
					<span>System</span>
				</Button>

				<Button
					data-color-scheme="light"
					selected={isLightMode}
					direction="vertical"
					variant="outlined"
					onClick={handleChangeColorScheme}>
					<MaterialSymbol
						size={3}
						grade={-25}
						weight={300}
						variant="light_mode"
					/>
					<span>Light</span>
				</Button>
				<Button
					data-color-scheme="dark"
					selected={isDarkMode}
					direction="vertical"
					variant="outlined"
					onClick={handleChangeColorScheme}>
					<MaterialSymbol
						size={3}
						grade={-25}
						weight={200}
						variant="dark_mode"
					/>
					<span>Dark</span>
				</Button>
			</ButtonGroup>
		</section>
	);
}
