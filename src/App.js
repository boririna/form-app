import { useState, useRef, useEffect } from 'react';
import './App.css';

const sendFormData = (formData) => {
	console.log(formData);
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

		let newError = null;

		if (target.value.length > 40) {
			newError = 'Неверный имейл. Должно быть не больше 40 символов.';
		}

		setEmailError(newError);
	};

	const mailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

	const onEmailBlur = () => {
		if (!mailFormat.test(email)) {
			setEmailError('Неверный имейл.');
		}
	};

	// password validation

	const onPasswordChange = ({ target }) => {
		setFormData({
			...formData,
			password: target.value,
		});

		let newError = null;

		if (target.value.length > 20) {
			newError = 'Неверный пароль. Должно быть не больше 20 символов.';
		}

		setPasswordError(newError);
	};

	const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

	const onPasswordBlur = () => {
		if (!passwordFormat.test(password)) {
			console.log(password);
			setPasswordError(
				'Неверный пароль. Должна быть хотя бы одна цифра, маленькая и большая буква и минимум 8 символов',
			);
		}
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
