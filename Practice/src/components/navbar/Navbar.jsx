import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

function Navbar() {
	const { isDark, toggleTheme } = useTheme();

	return (
		<header className="navbar">
			<div>
				<h1 className="navbar-brand">Practice</h1>
				<p className="navbar-tagline">Theme context and routing demo</p>
			</div>

			<nav className="navbar-links">
				<NavLink to="/" end>
					Home
				</NavLink>
				<NavLink to="/about">About</NavLink>
				<NavLink to="/dashboard">Dashboard</NavLink>
				<NavLink to="/login">Sign In</NavLink>
				<NavLink to="/signup">Sign Up</NavLink>
				<button className="theme-toggle" onClick={toggleTheme}>
					{isDark ? 'Light' : 'Dark'}
				</button>
			</nav>
		</header>
	);
}

export default Navbar;