import { selectContent } from "./ContentSelection";
import { getSortedTasks, setSortedTasks } from "./ContentSorting";
import { displayProjectsList, displayContent } from "./Display";
import addEventListeners from "./EventListeners";
import { loadProjectsFromLocalStorage } from "./LocalStorage";
import { createProject, getAllProjects } from "./Projects";

const dateInput = document.getElementById("taskDueDate");

const initialLoad = () => {
    flatpickr(dateInput, {
        dateFormat: "d/m/Y",
        minDate: "today",
    });
    loadProjectsFromLocalStorage();
    setSortedTasks([]);
    const projects = getAllProjects();
    if(projects.length == 0) {
        createProject("My Project");
    }
    displayProjectsList();
    selectContent("Today");
    const tasks = getSortedTasks();
    displayContent("Today",tasks);
    addEventListeners();
}

export default initialLoad;