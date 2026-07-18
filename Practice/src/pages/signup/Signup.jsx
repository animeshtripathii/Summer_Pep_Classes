import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSimpleUser } from '../../services/authApi';
import './Signup.css';

function Signup() {
	const navigate = useNavigate();
	const [formValues, setFormValues] = useState({
		firstName: '',
		lastName: '',
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

		const trimmedValues = {
			firstName: formValues.firstName.trim(),
			lastName: formValues.lastName.trim(),
			email: formValues.email.trim(),
			password: formValues.password.trim(),
		};

		if (!trimmedValues.firstName || !trimmedValues.lastName || !trimmedValues.email || !trimmedValues.password) {
			setError('Please fill in all fields before submitting.');
			setLoading(false);
			return;
		}

		try {
			await createSimpleUser(trimmedValues);
			navigate('/dashboard', { replace: true });
		} catch (submitError) {
			setError(submitError.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="signup-page">
			<form className="signup-card" onSubmit={handleSubmit}>
				<p className="auth-label">Create Account</p>
				<h2>Sign Up</h2>
				{error ? <p className="form-message form-message-error">{error}</p> : null}

				<label htmlFor="firstName">First Name</label>
				<input
					id="firstName"
					name="firstName"
					type="text"
					placeholder="Enter your first name"
					required
					value={formValues.firstName}
					onChange={handleChange}
				/>

				<label htmlFor="lastName">Last Name</label>
				<input
					id="lastName"
					name="lastName"
					type="text"
					placeholder="Enter your last name"
					required
					value={formValues.lastName}
					onChange={handleChange}
				/>

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
					{loading ? 'Creating account...' : 'Submit'}
				</button>
			</form>
		</div>
	);
}

export default Signup;
