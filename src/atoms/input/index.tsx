import { ChangeEvent } from 'react';

import css from './styles.module.css';

interface InputProps {
	id?: string;
	name: string;
	placeholder: string;

	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	onFocus?: (event: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
	id,
	name,
	placeholder,

	onChange,
	onFocus,
	onBlur,
}: InputProps): JSX.Element {
	id ||= name;

	return (
		<fieldset className={css.input}>
			<input
				id={id}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
			/>
			<label htmlFor={id}>{placeholder}</label>
		</fieldset>
	);
}
