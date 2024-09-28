import { setSortedTasks } from "./ContentSorting";
import { findProject } from "./Projects";
import { getAllTasks } from "./Task";

let filteredTasks = [];

export function getFilteredTasks() {
    return filteredTasks;
}

const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
}


const getCurrentDate = () => {
    const today = new Date();
    return formatDate(today);
}

const getCurrentWeekRange = () => {
    const today = new Date();
    const firstDayOfWeek = today.getDate() - today.getDay();
    const startOfWeek = new Date(today.setDate(firstDayOfWeek));
    const endOfWeek = new Date(today.setDate(firstDayOfWeek + 6));

    return {
        start: formatDate(startOfWeek),
        end: formatDate(endOfWeek),
    };
}

const getCurrentMonthRange = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return {
        start: formatDate(startOfMonth),
        end: formatDate(endOfMonth),
    };
}

const selectTasksByProject = (projectTitle) => {
    const project = findProject(projectTitle);
    filteredTasks = project.tasks ;
    setSortedTasks(filteredTasks);
}

const selectTodayTasks = () => {
    const tasks = getAllTasks();
    const today = getCurrentDate();
    filteredTasks = tasks.filter(task => task.dueDate === today);
    setSortedTasks(filteredTasks);
}

const selectCurrentWeekTasks = () => {
    const tasks = getAllTasks();
    const { start, end } = getCurrentWeekRange();

    filteredTasks = tasks.filter(task => task.dueDate >= start && task.dueDate <= end);
    setSortedTasks(filteredTasks);
}

const selectCuurentMonthTasks = () => {
    const tasks = getAllTasks();
    let { start, end } = getCurrentMonthRange();
    start = parseDate(start);
    end = parseDate(end);
    filteredTasks = tasks.filter(task => {
        const taskDueDate = parseDate(task.dueDate);
        return taskDueDate >= start && taskDueDate <= end;
    });
    setSortedTasks(filteredTasks);
}

const selectOverdueTasks = () => {
    const tasks = getAllTasks();
    const today = getCurrentDate();

    filteredTasks = tasks.filter(task => task.dueDate < today && !task.completed);
    setSortedTasks(filteredTasks);
}

const selectAllTasks = () => {
    filteredTasks = getAllTasks();
    setSortedTasks(filteredTasks);
}

const getFilter = (title) => {
    switch (title) {
        case "Today":
            return "today";
        case "This Week":
            return "week";
        case "This Month":
            return "month";
        case "Overdue":
            return "overdue";
        case "All Tasks":
            return "all";
        default: 
            return "project";   
    }
}

export function selectContent(title) {

    const filter = getFilter(title);
    switch (filter) {
        case "project":
            selectTasksByProject(title);
            break;
        case "today":
            selectTodayTasks();
            break;
        case "week": 
            selectCurrentWeekTasks();
            break;
        case "month":
            selectCuurentMonthTasks();
            break;
        case "overdue":
            selectOverdueTasks();
            break;
        case "all":
            selectAllTasks();
            break;
        default: return ;
    }
}