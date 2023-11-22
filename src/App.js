import { useState } from 'react';
import './App.css';

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	// const [email, setEmail] = useState('');
	// const [password, setpassword] = useState('');

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		repeatPassword: '',
	});
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [repeatPasswordError, setRepeatPasswordError] = useState(null);

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

	const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

	const onPasswordBlur = () => {
		if (!passwordFormat.test(password)) {
			console.log(password);
			setPasswordError(
				'Неверный пароль. Должна быть хотя бы одна цифра, маленькая и большая буква и минимум 8 символов',
			);
		}
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
					onChange={({ target }) =>
						setFormData({
							...formData,
							password: target.value,
						})
					}
					onBlur={onPasswordBlur}
				/>
				{repeatPasswordError && <div>{repeatPasswordError}</div>}
				<input
					name="repeatPassword"
					type="password"
					placeholder="Повторите пароль"
					value={repeatPassword}
					onChange={({ target }) =>
						setFormData({
							...formData,
							repeatPassword: target.value,
						})
					}
					onBlur={onRepeatPasswordBlur}
				/>
				<button
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
