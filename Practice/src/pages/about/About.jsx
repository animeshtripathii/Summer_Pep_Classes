import './About.css';

function About() {
	return (
		<section className="page-card info-card">
			<p className="eyebrow">About</p>
			<h2>What this practice app shows</h2>
			<div className="info-grid">
				<div>
					<h3>Context API</h3>
					<p>Theme state is shared across the app without prop drilling.</p>
				</div>
				<div>
					<h3>Routing</h3>
					<p>Navigation links connect the Home, About, Sign In, Sign Up, and Dashboard pages.</p>
				</div>
				<div>
					<h3>Reusable UI</h3>
					<p>The navbar and page shells are reusable pieces you can extend later.</p>
				</div>
			</div>
		</section>
	);
}

export default About;