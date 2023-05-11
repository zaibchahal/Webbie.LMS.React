import { useEffect, useState } from 'react';
import { init } from './Google';

declare global {
	interface Window {
		gapi: any;
	}
}

const GoogleClass = () => {
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		init().then(() => {
			window.gapi.client.classroom.courses.list().then((response: any) => {
				// console.log(response.result);
				setCourses(response.result.courses);
			});
		});
	}, []);

	return (
		<div>
			<h1>My Courses</h1>
			<ul>
				{courses.map((course: any) => (
					<li key={course.id}>{course.name}</li>
				))}
			</ul>
		</div>
	);
};

export default GoogleClass;
