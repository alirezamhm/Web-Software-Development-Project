import { PUBLIC_API_URL } from "$env/static/public";

const getCourses = async () => {
    const response = await fetch(`${PUBLIC_API_URL}/api/courses`);
    return await response.json();   
};

const getCourse = async (id) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/courses/${id}`);
    return await response.json();
};

const addCourse = async (course) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/courses`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(course),
    });
    return await response.json();
};

const deleteCourse = async (id) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/courses/${id}`, {
        method: "DELETE",
    });
    return await response.json();
};

export { getCourses, getCourse, addCourse, deleteCourse };