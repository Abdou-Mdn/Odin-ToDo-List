import { getFilteredTasks } from "./ContentSelection";


let sortedTasks = [];

export function getSortedTasks() {
    return sortedTasks;
}

export function setSortedTasks(tasks) {
    sortedTasks = tasks;
}

const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
}

const compareStrings = (a, b) => {
    return a.localeCompare(b, undefined, { sensitivity: 'base' });
}

const compareDates = (a, b) => {
    const dateA = parseDate(a);
    const dateB = parseDate(b);
    return dateA - dateB;
}

const comparePriority = (taskA, taskB) => {
    const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
    return priorityOrder[taskA.priority] - priorityOrder[taskB.priority];
}

export function sortTasks(sortMode, sortOrder) {

    if(sortMode == "Default") {
        sortedTasks = getFilteredTasks();
        sortedTasks = sortOrder === "asc" ? sortedTasks : sortedTasks.reverse();
    }else {
        sortedTasks.sort((taskA, taskB) => {
            let result = 0;
    
            switch (sortMode) {
                case "Name":
                    result = compareStrings(taskA.title, taskB.title); 
                    break;
                case "Date":
                    result = compareDates(taskA.dueDate, taskB.dueDate); 
                    break;
                case "Priority":
                    result = comparePriority(taskA, taskB); 
                    break;
                case "Status":
                    result = taskA.completed - taskB.completed;
                    break;
                default:
                    return 0;
            }
    
            return sortOrder === "asc" ? -result : result;
        });
    }

}