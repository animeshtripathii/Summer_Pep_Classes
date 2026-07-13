function CourseCard({ course }) {
	if (!course) {
		return null;
	}

	return (
		<article className="course-card">
			<img className="course-image" src={course.image} alt={course.title} />
			<div className="course-content">
				<h3>{course.title}</h3>
				<p><strong>Instructor:</strong>{course.instructor}</p>
				<p><strong>Price:</strong>{course.price}</p>
				<p><strong>Duartion:</strong>{course.duration}</p>
				<p><strong>Level:</strong>{course.level}</p>
			</div>
		</article>
	);
}

export default CourseCard;