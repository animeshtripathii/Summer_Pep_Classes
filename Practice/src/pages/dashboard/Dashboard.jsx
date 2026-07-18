import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentUser, logoutUser } from '../../services/authApi';
import courses from '../../data/courses';
import CourseCard from '../../components/course-card/CourseCard';
import './Dashboard.css';

function Dashboard() {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = useState(null);
	const [status, setStatus] = useState('Checking your session...');

	useEffect(() => {
		fetchCurrentUser()
			.then((response) => {
				setCurrentUser(response.user);
				setStatus('');
			})
			.catch(() => {
				navigate('/login', { replace: true });
			});
	}, [navigate]);

	const handleLogout = async () => {
		try {
			await logoutUser();
		} finally {
			navigate('/login', { replace: true });
		}
	};

	return (
		<section className="dashboard-shell">
			<div className="dashboard-heading">
				<p className="eyebrow">Dashboard</p>
				<h2>{currentUser ? `Welcome, ${currentUser.firstName}` : 'Course Library'}</h2>
				<p>
					{status || 'JWT-protected user data is loaded from the Express backend before the course cards render.'}
				</p>
				{currentUser ? (
					<button className="logout-button" type="button" onClick={handleLogout}>
						Sign Out
					</button>
				) : null}
			</div>

			<div className="course-grid">
				{courses.map((course) => (
					<CourseCard key={course.id} course={course} />
				))}
			</div>
		</section>
	);
}

export default Dashboard;
