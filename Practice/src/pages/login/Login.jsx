import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate("/dashboard");
	};

	return (
		<div className="login-page">
			<form className="login-card" onSubmit={handleSubmit} >
				<h2>Login</h2>

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

export default Login;
