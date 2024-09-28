import { getAllProjects } from "./Projects";


export function createTask(title,description,dueDate,priority,project) {
    const task = {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        completed: false,
        project: project.title
    }

    project.tasks.push(task);
}

export function updateTask(oldTitle,project,newTitle,description,dueDate,priority) {
    const task = findTask(oldTitle,project);
    if (task) {
        task.title = newTitle || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.priority = priority || task.priority;
    } else {
        alert('Task not found.');
    }
}

export function toggleTaskStatus(task) {
    console.log(task.completed);
    task.completed = !task.completed;
    console.log(task.completed);
}

export function deleteTask(title,project) {
    const taskTitles = project.tasks.map(task => task.title.trim().toLowerCase());
    const index = taskTitles.indexOf(title.trim().toLowerCase());
    if (index !== -1) {
        project.tasks.splice(index, 1);
    } else {
        alert('Task not found.');
    }
}

export function getAllTasks() {
    const projects = getAllProjects();
    const tasks = projects.flatMap(project => project.tasks);
    return tasks;
}

export function findTask(title,project) {
    return project.tasks.find(task => task.title === title);
}