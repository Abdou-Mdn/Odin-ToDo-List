import { getAllProjects, deleteProject, findProject } from "./Projects";
import { deleteTask, toggleTaskStatus } from "./Task";
import { changeActiveLink, defaultSortingInputValues } from "./EventListeners";
import { setEditingProject, getEditingTask, setEditingTask } from "./Forms";
import { getSortedTasks } from "./ContentSorting";
import { saveProjectsToLocalStorage } from "./LocalStorage";
import { selectContent } from "./ContentSelection";


export function displayProjectsList () {
    const projects = getAllProjects();
    const projectsList = document.getElementById("projectsList");

    projectsList.replaceChildren();
    for (let i=0; i< projects.length; i++) {
        const title = projects[i].title;
        const li = document.createElement("li");
        li.className = "filter";
        const link = document.createElement("a");
        link.innerHTML = `<i class="fa-solid fa-bars-progress"></i> ${title}`;
        link.addEventListener("click",(event) => {
            event.preventDefault();
            changeActiveLink(event.target.parentNode);
            selectContent(title);
            const tasks = getSortedTasks();
            displayContent(title,tasks);
        });
        li.appendChild(link);

        const editBtn = document.createElement("button");
        editBtn.className = "editBtn";
        editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        editBtn.addEventListener("click",() => {
            displayProjectForm(title);
            setEditingProject(true,title);
        });
        li.appendChild(editBtn);

        const trashBtn = document.createElement("button");
        trashBtn.className = "deleteBtn";
        trashBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trashBtn.addEventListener("click",() => {
            const defaultLink = document.getElementById("defaultActiveLink");
            deleteProject(title);
            displayProjectsList();   
            changeActiveLink(defaultLink);
            selectContent("Today");
            const tasks = getSortedTasks();
            displayContent("Today",tasks);
            defaultSortingInputValues();
            
        });
        li.appendChild(trashBtn);

        projectsList.appendChild(li);
    }
}

export function displayProjectForm(title) {
    const formContainer = document.getElementById("formContainer");
    const projectForm = document.getElementById("addProjectForm");
    const projectTitleInput = document.getElementById("projectTitle")
    projectTitleInput.value = title ;
    formContainer.classList.add("active");
    projectForm.classList.add("active");
}

export function displayTaskForm (title,description,date,priority) {
    const formContainer = document.getElementById("formContainer");
    const taskForm = document.getElementById("addTaskForm");
    const taskTitleInput = document.getElementById("taskTitle");
    const taskDescriptionInput = document.getElementById("taskDescription");
    const taskDateInput = document.getElementById("taskDueDate");
    const taskPriorityInput = document.getElementById("taskPriority");
    taskTitleInput.value = title;
    taskDescriptionInput.value = description;
    taskDateInput.value = date;
    taskPriorityInput.value = priority;
    displaySelectedPriority(priority);
    formContainer.classList.add("active");
    taskForm.classList.add("active");
}

export function displayProjectSelectionList () {
    const projects = getAllProjects();
    const select = document.getElementById("projectSelect");

    const editingTask = getEditingTask();
    const editing = editingTask.status;
    const projectTitle = editingTask.projectTitle;
    if (editing === false) {
        select.replaceChildren();
        select.innerHTML = '<option value="" disabled selected hidden>Select Project</option>'
        for (let i=0; i< projects.length; i++) {
            select.innerHTML += `<option value="${projects[i].title}">${projects[i].title}</option>`
        }
    }else {
        select.replaceChildren();
        select.innerHTML = `<option value="${projectTitle}" selected>${projectTitle}</option>`;
    }
    
}

export function displaySelectedPriority(priority) {
    const selectedDiv = document.getElementById("selected");
    selectedDiv.replaceChildren();
    selectedDiv.innerHTML = `<div class="flag ${priority}"></div> ${priority}`;
}

export function displayContent(title,tasks = []) {
    const heading = document.getElementById("heading");
    heading.innerText = title ;

    const counter = document.getElementById("tasksCounter");
    counter.innerHTML = `<i class="fa-solid fa-check"></i> ${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`;

    const contentUl = document.getElementById("content");
    contentUl.replaceChildren();

    for(let i=0; i< tasks.length; i++) {
        const task = tasks[i];
        const taskLi = document.createElement("li");
        task.completed ? taskLi.classList.add("task","checked"): taskLi.classList.add("task");
        
        const infosDiv = document.createElement("div");
        infosDiv.className = "basicInfos";

        const checkBtn = document.createElement("button");
        checkBtn.className = "checkBtn";
        checkBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i>'  ;
        checkBtn.addEventListener("click",() => {
            toggleTaskStatus(task);
            saveProjectsToLocalStorage();
            reDisplayContent();
        });    
        infosDiv.appendChild(checkBtn);

        const title = document.createElement("h3");
        title.innerText = task.title;
        infosDiv.appendChild(title);

        taskLi.appendChild(infosDiv);

        const moreInfosDiv = document.createElement("div");
        moreInfosDiv.className = "moreInfos";

        const description = document.createElement("p");
        description.className = "description";
        description.innerText = task.description;
        moreInfosDiv.appendChild(description);

        const priority = document.createElement("div");
        priority.className = "priority";
        priority.innerHTML = `<div class="flag ${task.priority}"></div> <span>${task.priority}</span>`;
        moreInfosDiv.appendChild(priority);

        const dueDate = document.createElement("span");
        dueDate.className = "date";
        dueDate.innerText = task.dueDate;
        moreInfosDiv.appendChild(dueDate);

        const buttonsDiv = document.createElement("div");
        buttonsDiv.className = "taskButtons";
        
        const editBtn = document.createElement("button");
        editBtn.className = "editTaskBtn";
        editBtn.innerText = "Edit";
        editBtn.addEventListener("click", () => {
            setEditingTask(true,task.title,task.project);
            displayTaskForm(task.title,task.description,task.dueDate,task.priority);
            displayProjectSelectionList();
        });
        buttonsDiv.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "deleteTaskBtn";
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", () => {
            const project = findProject(task.project);
            deleteTask(task.title,project);
            saveProjectsToLocalStorage(); 
            reDisplayContent();  
        });
        buttonsDiv.appendChild(deleteBtn);

        moreInfosDiv.appendChild(buttonsDiv);
        taskLi.appendChild(moreInfosDiv);

        contentUl.appendChild(taskLi);
    }
}

export function reDisplayContent() {
    const heading = document.getElementById("heading").innerText;
    selectContent(heading);
    const tasks = getSortedTasks();
    displayContent(heading,tasks);
    defaultSortingInputValues();
}