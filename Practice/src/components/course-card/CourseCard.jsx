function CourseCard({ course }) {
	return (
		<article className="course-card">
			<div className="course-content">
				<h3>{course.name}</h3>
				<p>{course.description}</p>
			</div>
		</article>
	);
}

export default CourseCard;