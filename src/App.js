import { useState, useRef, useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './App.css';

const sendFormData = (formData) => {
	console.log(formData);
};

const fieldsSchema = yup.object().shape({
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

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
		},
		resolver: yupResolver(fieldsSchema),
	});

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const repeatPasswordError = errors.repeatPassword?.message;

	useEffect(() => {
		if (
			emailError === null &&
			passwordError === null &&
			register.password === register.repeatPassword
		) {
			submitButtonRef.current.focus();
		}
	}, [register.password, register.repeatPassword]);

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
