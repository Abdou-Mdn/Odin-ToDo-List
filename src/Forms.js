import { createProject, findProject, updateProjectTitle } from "./Projects";
import { createTask, updateTask } from "./Task";
import { displayProjectsList, reDisplayContent } from "./Display";
import { saveProjectsToLocalStorage } from "./LocalStorage";


let editingProject = {
    status: false,
    oldTitle: "",
} ;
export function setEditingProject(status, oldTitle) {
    editingProject.status = status;
    editingProject.oldTitle = oldTitle;
}

let editingTask = {
    status: false,
    oldTitle: "",
    projectTitle: "",
};

export function setEditingTask(status,oldTitle,project) {
    editingTask.status = status;
    editingTask.oldTitle = oldTitle;
    editingTask.projectTitle = project;
}

export function getEditingTask() {
    return editingTask;
}

export function handleProjectFormSubmition () {
    const projectTitleInput = document.getElementById("projectTitle");
    const newTitle = projectTitleInput.value.trim();
    if(editingProject.status === false){
        createProject(newTitle);
    }else {
        updateProjectTitle(editingProject.oldTitle,newTitle);
    }
    
    saveProjectsToLocalStorage();
    displayProjectsList();
    reDisplayContent();
}

export function handleTaskFormSubmition () {
    const taskTitle = document.getElementById("taskTitle").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskDueDate = document.getElementById("taskDueDate").value;
    const taskPriority = document.getElementById("taskPriority").value;
    const projectTitle = document.getElementById("projectSelect").value;

    const project = findProject(projectTitle);

    if(editingTask.status === false) {
        createTask(taskTitle,taskDescription,taskDueDate,taskPriority,project);
    }else {
        updateTask(editingTask.oldTitle,project,taskTitle,taskDescription,taskDueDate,taskPriority);
    }
    
    saveProjectsToLocalStorage();
    reDisplayContent();
}