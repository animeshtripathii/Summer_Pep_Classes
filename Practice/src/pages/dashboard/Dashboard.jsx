import './Dashboard.css';
import courses from '../../data/courses';
import CourseCard from '../../components/course-card/CourseCard';

function Dashboard() {
	return (
		<section className="dashboard-shell">
			<div className="dashboard-heading">
				<p className="eyebrow">Dashboard</p>
				<h2>Course Library</h2>
				<p>Dummy course data is mapped into cards here to show course name and a short description.</p>
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
