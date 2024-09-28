

let projects = [];

export function setProjects(projectList) {
    projects = projectList;
}

export function createProject(title) {
    const project = {
        title: title,
        tasks: []
    }
    projects.push(project);
}

export function deleteProject(title) {
    const projectTitles = projects.map(project => project.title.trim().toLowerCase());
    const index = projectTitles.indexOf(title.trim().toLowerCase());
    if (index !== -1) {
        projects.splice(index, 1);
    } else {
        alert('Project not found.');
    }
}

export function updateProjectTitle(oldTitle,newTitle) {
    const project = findProject(oldTitle);
    project.title = newTitle;
}

export function getAllProjects() {
    return projects;
}

export function findProject(title) {
    return projects.find(project => project.title === title);
}
 