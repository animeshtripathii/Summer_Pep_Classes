import "./Signup.css";
import { useNavigate } from "react-router-dom";
function Signup() {
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		navigate("/dashboard");
	};

	return (
		<div className="signup-page">
			<form className="signup-card" onSubmit={handleSubmit}>
				<p className="auth-label">Create Account</p>
				<h2>Sign Up</h2>

				<label htmlFor="firstName">First Name</label>
				<input
					id="firstName"
					name="firstName"
					type="text"
					placeholder="Enter your first name"
					required
				/>

				<label htmlFor="lastName">Last Name</label>
				<input
					id="lastName"
					name="lastName"
					type="text"
					placeholder="Enter your last name"
					required
				/>

				<label htmlFor="email">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					placeholder="Enter your email"
					required
				/>

				<label htmlFor="password">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					placeholder="Enter your password"
					required
				/>

				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default Signup;
