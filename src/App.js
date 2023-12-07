import { useState, useRef, useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './App.css';

const sendFormData = (formData) => {
	console.log(formData);
};

const fieldSchema = yup.object().shape({
	email: yup
		.string()
		.matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Неверный имейл.')
		.max(40, 'Неверный имейл. Должно быть не больше 40 символов.'),
	password: yup
		.string()
		.max(20, 'Неверный пароль. Должно быть не больше 20 символов.')
		.matches(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
			'Неверный пароль. Должна быть хотя бы одна цифра, маленькая и большая буква и минимум 8 символов.',
		),
	repeatPassword: yup
		.string()
		.max(20, 'Неверный пароль. Должно быть не больше 20 символов.')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

const onEmailChangeSchema = yup
	.string()
	.max(40, 'Неверный имейл. Должно быть не больше 40 символов.');

const onEmailBlurSchema = yup
	.string()
	.string()
	.matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Неверный имейл.');

const onPasswordChangeSchema = yup
	.string()
	.max(20, 'Неверный пароль. Должно быть не больше 20 символов.');

const onPasswordBlurSchema = yup
	.string()
	.matches(
		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
		'Неверный пароль. Должна быть хотя бы одна цифра, маленькая и большая буква и минимум 8 символов.',
	);

const validateAndGetErrorMessage = (schema, value) => {
	let errorMessage = null;

	try {
		schema.validateSync(value);
	} catch ({ errors }) {
		errorMessage = errors
			.reduce((message, error) => message + error + 'n', '')
			.trim();
	}

	return errorMessage;
};

export const App = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		repeatPassword: '',
	});
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [repeatPasswordError, setRepeatPasswordError] = useState(null);

	const submitButtonRef = useRef(null);

	// email validation

	const onEmailChange = ({ target }) => {
		setFormData({
			...formData,
			email: target.value,
		});

		const newError = validateAndGetErrorMessage(onEmailChangeSchema, target.value);

		setEmailError(newError);
	};

	const onEmailBlur = ({ target }) => {
		const newError = validateAndGetErrorMessage(onEmailBlurSchema, target.value);
		setEmailError(newError);
	};

	// password validation

	const onPasswordChange = ({ target }) => {
		setFormData({
			...formData,
			password: target.value,
		});

		const newError = validateAndGetErrorMessage(onPasswordChangeSchema, target.value);

		setPasswordError(newError);
	};

	const onPasswordBlur = ({ target }) => {
		const newError = validateAndGetErrorMessage(onPasswordBlurSchema, target.value);

		setPasswordError(newError);
	};

	// repeat password check

	const onRepeatPasswordChange = ({ target }) => {
		setFormData({
			...formData,
			repeatPassword: target.value,
		});

		let newError = null;

		if (target.value.length > 20) {
			newError = 'Неверный пароль. Должно быть не больше 20 символов.';
		}

		setRepeatPasswordError(newError);
	};

	const onRepeatPasswordBlur = () => {
		if (repeatPassword !== password) {
			setRepeatPasswordError('Пароли не совпадают');
		}
	};

	const { email, password, repeatPassword } = formData;

	const onSubmit = (event) => {
		event.preventDefault();

		sendFormData(formData);
	};

	useEffect(() => {
		if (
			emailError === null &&
			passwordError === null &&
			password === repeatPassword
		) {
			submitButtonRef.current.focus();
		}
	}, [password, repeatPassword]);

	return (
		<div className="App">
			<form onSubmit={onSubmit}>
				{emailError && <div>{emailError}</div>}
				<input
					name="email"
					type="email"
					placeholder="Почта"
					value={email}
					onChange={onEmailChange}
					onBlur={onEmailBlur}
				/>
				{passwordError && <div>{passwordError}</div>}
				<input
					name="password"
					type="password"
					placeholder="Пароль"
					value={password}
					onChange={onPasswordChange}
					onBlur={onPasswordBlur}
				/>
				{repeatPasswordError && <div>{repeatPasswordError}</div>}
				<input
					name="repeatPassword"
					type="password"
					placeholder="Повторите пароль"
					value={repeatPassword}
					onChange={onRepeatPasswordChange}
					onBlur={onRepeatPasswordBlur}
				/>
				<button
					ref={submitButtonRef}
					type="submit"
					disabled={!!emailError || !!passwordError || repeatPasswordError}
					className={
						!!emailError || !!passwordError || !!repeatPasswordError
							? 'disabled'
							: ''
					}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
