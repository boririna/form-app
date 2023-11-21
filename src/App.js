import { useState } from 'react';
import './App.css';

export const App = () => {
	// const [email, setEmail] = useState('');
	// const [password, setpassword] = useState('');

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		repeatPassword: '',
	});

	const sendFormData = (formData) => {
		console.log(formData);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData(formData);
	};

	const { email, password, repeatPassword } = formData;

	return (
		<div className="App">
			<form onSubmit={onSubmit}>
				<input
					name="email"
					type="email"
					placeholder="Почта"
					value={email}
					onChange={({ target }) =>
						setFormData({
							...formData,
							email: target.value,
						})
					}
				/>
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
				/>
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
				/>
				<button type="submit">Зарегистрироваться</button>
			</form>
		</div>
	);
};
