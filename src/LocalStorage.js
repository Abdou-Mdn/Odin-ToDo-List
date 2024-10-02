import { getAllProjects, setProjects } from "./Projects";


export function loadProjectsFromLocalStorage() {
    const storedProjects = JSON.parse(localStorage.getItem('projects'));
    const projects = storedProjects ? storedProjects : [];
    setProjects(projects);
}

export function saveProjectsToLocalStorage() {
    const projects = getAllProjects(); 
    localStorage.setItem('projects', JSON.stringify(projects)); 
}