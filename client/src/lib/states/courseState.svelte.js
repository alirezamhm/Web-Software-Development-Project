import * as coursesApi from "$lib/apis/courses-api.js";

let courseState = $state([]);

const loadCourses = async () => {
    courseState = await coursesApi.getCourses();
}

const useCourseState = () => {
    return {
        get courses() {
            return courseState;
        },
        getOne: async (id) => {
            const course = await coursesApi.getCourse(id);
            return course;
        },
        load: async () => {
            loadCourses();
        },
        add: async (course) => {
            const newCourse = await coursesApi.addCourse(course);
            loadCourses();
        },
        remove: async (id) => {
            const removedCourse = await coursesApi.deleteCourse(id);
            loadCourses();
        },
    }
}

export { useCourseState };