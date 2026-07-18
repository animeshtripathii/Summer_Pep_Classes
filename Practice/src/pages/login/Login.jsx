import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authApi';
import './Login.css';

function Login() {
	const navigate = useNavigate();
	const [formValues, setFormValues] = useState({
		email: '',
		password: '',
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormValues((currentValues) => ({
			...currentValues,
			[name]: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError('');
		setLoading(true);

		try {
			await loginUser(formValues);
			navigate('/dashboard', { replace: true });
		} catch (submitError) {
			setError(submitError.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="login-page">
			<form className="login-card" onSubmit={handleSubmit}>
				<p className="auth-label">Sign In</p>
				<h2>Login</h2>
				{error ? <p className="form-message form-message-error">{error}</p> : null}

				<label htmlFor="email">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					placeholder="Enter your email"
					required
					value={formValues.email}
					onChange={handleChange}
				/>

				<label htmlFor="password">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					placeholder="Enter your password"
					required
					value={formValues.password}
					onChange={handleChange}
				/>

				<button type="submit" disabled={loading}>
					{loading ? 'Signing in...' : 'Submit'}
				</button>
			</form>
		</div>
	);
}

export default Login;
