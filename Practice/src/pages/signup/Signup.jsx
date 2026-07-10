import "./Signup.css";

function Signup() {
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="signup-page">
			<form className="signup-card" onSubmit={handleSubmit}>
				<h2>Sign Up</h2>

				<label htmlFor="username">Username</label>
				<input
					id="username"
					name="username"
					type="text"
					placeholder="Enter your username"
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
