
import { getFilteredTasks, selectContent } from "./ContentSelection";
import { getSortedTasks, sortTasks } from "./ContentSorting";
import { displayProjectSelectionList, displaySelectedPriority, displayProjectForm, displayTaskForm, displayContent } from "./Display";
import { handleProjectFormSubmition, handleTaskFormSubmition, setEditingProject } from "./Forms";
import { setEditingTask } from "./Forms";

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menuBar");
const closeBtn = document.getElementById("closeBtn");
const blackDiv = document.getElementById("blackBackground");
const addTaskBtn = document.getElementById("addTaskBtn");
const formContainer = document.getElementById("formContainer");
const taskForm = document.getElementById("addTaskForm");
const taskPriorityInput = document.getElementById("taskPriority");
const selectedPriority = document.getElementById("selected");
const dropDown = document.getElementById("dropDown");
const priorityOptions = dropDown.getElementsByClassName("option");
const addProjectBtn = document.getElementById("addProjectBtn");
const projectForm = document.getElementById("addProjectForm");
const cancelBtns = document.getElementsByClassName("cancelBtn");
const confirmBtns = document.getElementsByClassName("confirmBtn");
const filterLinks = document.getElementsByClassName("filter");
const sortingInput = document.getElementById("sortingInput");
const orderBtn = document.getElementById("orderBtn");
const icon = document.getElementById("arrow");
const sortBtn = document.getElementById("sortBtn");
const heading = document.getElementById("heading");

const addEventListeners = () => {
    handleMenuDisplay();
    handleTaskFormDisplay();
    handleProjectFormDisplay();
    handleFilteredContentDisplay();
    handleSortingContent();
}

export default addEventListeners;

const handleMenuDisplay = () => {
    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("active");
        blackDiv.classList.toggle("active");
    });

    closeBtn.addEventListener("click", () => {
        menu.classList.remove("active");
        blackDiv.classList.remove("active");
    });

    blackDiv.addEventListener("click", () => {
        menu.classList.remove("active");
        blackDiv.classList.remove("active");
    })
}

const handleTaskFormDisplay = () => {
    addTaskBtn.addEventListener("click", () => {
        const confirmBtn = confirmBtns[1];
        setEditingTask(false,"","");
        displayTaskForm("","","","Medium");
        confirmBtn.innerText = "Add Task";
        displayProjectSelectionList();
        
    });

    selectedPriority.addEventListener("click",() => {
        dropDown.classList.toggle("active");
    });

    
    for (let i=0; i < priorityOptions.length; i++) {
        priorityOptions[i].addEventListener("click", () => {
            taskPriorityInput.value = priorityOptions[i].innerText;
            displaySelectedPriority(priorityOptions[i].innerText)
            dropDown.classList.remove("active");
        });
    }

    formContainer.addEventListener("click", () => {
        formContainer.classList.remove("active");
        taskForm.classList.remove("active");
        projectForm.classList.remove("active");

    });

    const cancelBtn = cancelBtns[1];
    cancelBtn.addEventListener("click", () => {
        formContainer.classList.remove("active");
        taskForm.classList.remove("active");
    });

    taskForm.addEventListener("click",(event) => {
        event.stopPropagation();
    })

    taskForm.addEventListener("submit",(event) => {
        event.preventDefault();
        handleTaskFormSubmition("");
        formContainer.classList.remove("active");
        taskForm.classList.remove("active");
    });
}


const handleProjectFormDisplay = () => {
    addProjectBtn.addEventListener("click", () => {
        const confirmBtn = confirmBtns[0];
        displayProjectForm("");
        confirmBtn.innerText = "Add Project";
        setEditingProject(false,"");
    });

    const cancelBtn = cancelBtns[0];
    cancelBtn.addEventListener("click", () => {
        formContainer.classList.remove("active");
        projectForm.classList.remove("active");
    });

    projectForm.addEventListener("click",(event) => {
        event.stopPropagation();
    })

    projectForm.addEventListener("submit",(event) => {
        event.preventDefault();
        handleProjectFormSubmition();
        formContainer.classList.remove("active");
        projectForm.classList.remove("active");
    });

}

const handleFilteredContentDisplay = () => {
    filterLinks[0].addEventListener("click",(event) => {
        event.preventDefault();
        selectContent("Today");
        const tasks = getFilteredTasks();
        displayContent("Today",tasks);
        defaultSortingInputValues();
        changeActiveLink(event.target.parentNode);
        menu.classList.remove("active");
        blackDiv.classList.remove("active");
    });

    filterLinks[1].addEventListener("click",(event) => {
        event.preventDefault();
        selectContent("This Week");
        const tasks = getFilteredTasks();
        displayContent("This Week",tasks);
        defaultSortingInputValues();
        changeActiveLink(event.target.parentNode);
        menu.classList.remove("active");
        blackDiv.classList.remove("active");
    });

    filterLinks[2].addEventListener("click",(event) => {
        event.preventDefault();
        selectContent("This Month");
        const tasks = getFilteredTasks()
        displayContent("This Month",tasks);
        defaultSortingInputValues();
        changeActiveLink(event.target.parentNode);
        menu.classList.remove("active");
        blackDiv.classList.remove("active");
    });

    filterLinks[3].addEventListener("click",(event) => {
        event.preventDefault();
        selectContent("Overdue");
        const tasks = getFilteredTasks();
        displayContent("Overdue",tasks);
        defaultSortingInputValues();
        changeActiveLink(event.target.parentNode);
        menu.classList.remove("active");
        blackDiv.classList.remove("active");
    });

    filterLinks[4].addEventListener("click",(event) => {
        event.preventDefault();
        selectContent("All Tasks")
        const tasks = getFilteredTasks();
        displayContent("All Tasks",tasks);
        defaultSortingInputValues();
        changeActiveLink(event.target.parentNode);
        menu.classList.remove("active");
        blackDiv.classList.remove("active");
    });
}

export function changeActiveLink(activeLink) {

    for(let i=0; i < filterLinks.length; i++) {
        if (filterLinks[i] === activeLink) {
            filterLinks[i].classList.add("active");
        }else {
            filterLinks[i].classList.remove("active");
        }
    }
}

const handleSortingContent = () => {

    sortingInput.addEventListener("change", () => {
        sortBtn.click();
    });

    orderBtn.addEventListener("click", () => {
        if(icon.classList.contains("fa-chevron-down")) {
            icon.classList.replace("fa-chevron-down","fa-chevron-up");
            orderBtn.value = "asc";
        } else {
            icon.classList.replace("fa-chevron-up","fa-chevron-down");
            orderBtn.value = "desc";
        }
        sortBtn.click();
    })

    sortBtn.addEventListener("click",() => {
        const sortMode = sortingInput.value;
        const sortOrder = orderBtn.value;
        const title = heading.innerText ;
        
        sortTasks(sortMode,sortOrder);
        const tasks = getSortedTasks();
        displayContent(title,tasks);
    })

}

export function defaultSortingInputValues() {
    sortingInput.value = "Default";
    icon.classList.replace("fa-chevron-up","fa-chevron-down");
    orderBtn.value = "desc";
}