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
		getValues,
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

	const submitButtonRef = useRef(null);

	const password = getValues('password');
	const repeatPassword = getValues('repeatPassword');

	useEffect(() => {
		if (
			emailError === null &&
			passwordError === null &&
			password === repeatPassword
		) {
			submitButtonRef.current.focus();
		}
		console.log('password', repeatPassword);
	}, [password, repeatPassword]);

	return (
		<div className="App">
			<form onSubmit={handleSubmit(sendFormData)}>
				{emailError && <div>{emailError}</div>}
				<input
					name="email"
					type="email"
					placeholder="Почта"
					{...register('email')}
				/>
				{passwordError && <div>{passwordError}</div>}
				<input
					name="password"
					type="password"
					placeholder="Пароль"
					{...register('password')}
				/>
				{repeatPasswordError && <div>{repeatPasswordError}</div>}
				<input
					name="repeatPassword"
					type="password"
					placeholder="Повторите пароль"
					{...register('repeatPassword')}
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
