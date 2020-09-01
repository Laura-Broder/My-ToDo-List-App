const addButton = document.querySelector(".addNew");
const deleteButton = document.querySelector(".deleteAll");
const theList = document.querySelector(".theList");
const saveButton = document.querySelector(".save");
const deleteCompletedButton = document.querySelector(".deleteCompleted");
const editTaskButtonsList = document.querySelectorAll(".editTask");
let tasksArray = [];

// console.log(tasksArray);
function updateLocalStorage(taskObj) {
  if (typeof Storage !== "undefined") {
    // Store
    localStorage.setItem(
      JSON.stringify(taskObj.idNum),
      JSON.stringify(taskObj),
    );
    console.log(localStorage);
  } else {
    console.log("Sorry, your browser does not support Web Storage...");
  }
}

function createTaskObj(taskForm) {
  let d = new Date();
  let taskObj = {};
  taskObj.taskContent = taskForm.textArea.value;
  taskObj.taskPriority = taskForm.querySelector(
    'input[type="radio"]:checked',
  ).value;
  taskObj.creationDate = d.toLocaleDateString("en-GB");
  taskObj.idNum = Math.floor(Math.random() * 10000);
  tasksArray.push(taskObj);
  updateLocalStorage(taskObj);

  console.log(tasksArray);
  return taskObj;
}

function createTaskElement(taskObj) {
  // task container div
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");
  taskElement.setAttribute("data-id", taskObj.idNum);

  // task checkbox
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("name", "task");

  // task content
  const taskContent = document.createElement("span");
  taskContent.textContent = `${taskObj.taskContent}`;
  taskContent.addEventListener("dblclick", editTaskMode);

  // task content edit field
  const taskContentEdit = document.createElement("input");
  taskContentEdit.setAttribute("type", "text");
  taskContentEdit.setAttribute("name", "editField");
  taskContentEdit.value = `${taskObj.taskContent}`;
  taskContentEdit.hidden = true;

  // save after edit button
  const saveAfterEditBtn = document.createElement("button");
  saveAfterEditBtn.classList.add("saveAfterEditBtn");
  saveAfterEditBtn.setAttribute("type", "button");
  saveAfterEditBtn.textContent = "Save";
  saveAfterEditBtn.hidden = true;
  saveAfterEditBtn.addEventListener("click", handleSaveAfterEditClick);

  // task additional data container
  const taskData = document.createElement("div");
  taskData.classList.add("taskData");

  // task priority
  const taskPriority = document.createElement("p");
  taskPriority.classList.add("priority");
  taskPriority.setAttribute("data-priority", `${taskObj.taskPriority}`);
  taskPriority.textContent = `Task Priority: ${taskObj.taskPriority}`;

  // task creation date
  const creationDate = document.createElement("p");
  creationDate.classList.add("date");
  creationDate.setAttribute("data-date", `${taskObj.creationDate}`);
  creationDate.textContent = `Creation Date: ${taskObj.creationDate}`;

  // insert to Html
  taskElement.insertAdjacentElement("beforeend", checkbox);
  taskElement.insertAdjacentElement("beforeend", taskContent);
  taskElement.insertAdjacentElement("beforeend", taskContentEdit);
  taskElement.insertAdjacentElement("beforeend", saveAfterEditBtn);
  taskElement.insertAdjacentElement("beforeend", taskData);
  taskData.insertAdjacentElement("beforeend", taskPriority);
  taskData.insertAdjacentElement("beforeend", creationDate);

  return taskElement;
}
function editTaskMode(event) {
  const taskToEdit = event.currentTarget.parentElement;
  taskToEdit.querySelector('[type="checkbox"]').hidden = true;
  taskToEdit.querySelector("span").hidden = true;
  taskToEdit.querySelector('[name="editField"]').hidden = false;
  taskToEdit.querySelector(".saveAfterEditBtn").hidden = false;
}
function handleSaveAfterEditClick(event) {
  const taskToEdit = event.currentTarget.parentElement;
  taskToEdit.querySelector("span").textContent = taskToEdit.querySelector(
    '[name="editField"]',
  ).value;
  taskToEdit.querySelector('[type="checkbox"]').hidden = false;
  taskToEdit.querySelector("span").hidden = false;
  taskToEdit.querySelector('[name="editField"]').hidden = true;
  taskToEdit.querySelector(".saveAfterEditBtn").hidden = true;
  let d = new Date();
  taskToEdit.querySelector(
    ".date",
  ).textContent = `Update Date: ${d.toLocaleDateString("en-GB")}`;

  // find the task in the array
  tasksArray.findIndex(taskToEdit.getAttribute("data-id"));
  // replace the text content
  tasksArray.splice(
    tasksArray.findIndex(taskToEdit.getAttribute("data-id")),
    1,
  );
  updateLocalStorage(taskObj);
}
function addTaskToList(taskObj) {
  theList.insertAdjacentElement("beforeend", taskObj);
}

function clearForm(taskForm) {
  taskForm.textArea.value = "";
  taskForm.querySelector('input[type="radio"][id="low"]').checked = true;
  document.querySelector(".newTask").hidden = true;
}

function handleAddClick() {
  if (document.querySelector(".newTask").hidden) {
    document.querySelector(".newTask").hidden = false;
  }
}
function handleDeleteClick() {
  localStorage.clear();
  theList.innerHTML = "All Done Here!!!";
}
function handleSaveClick() {
  const newTaskForm = document.querySelector('[name="addNewTaskForm"');
  const taskToAdd = createTaskObj(newTaskForm);
  if (tasksArray.length === 0) theList.innerHTML = "";
  if (!(taskToAdd.taskContent === "")) {
    addTaskToList(createTaskElement(taskToAdd));
    clearForm(newTaskForm);
  }
}
function handleDeleteCompletedClick() {
  if (document.querySelector('input[type="checkbox"]:checked')) {
    const TasksToDelete = document.querySelectorAll(
      'input[type="checkbox"]:checked',
    );

    TasksToDelete.forEach((completedTask) => {
      const completedTaskId = completedTask.parentElement.getAttribute(
        "data-id",
      );
      localStorage.removeItem(`${completedTaskId}`);
      completedTask.parentElement.remove();
    });
  }

  if (tasksArray.length === 0) theList.innerHTML = "All Done Here!!!";
}
function handleEditTaskButtonClick(event) {
  event.currentTarget.parentElement.editTask();
}

// add event listeners to the buttons
addButton.addEventListener("click", handleAddClick);
deleteButton.addEventListener("click", handleDeleteClick);
saveButton.addEventListener("click", handleSaveClick);
deleteCompletedButton.addEventListener("click", handleDeleteCompletedClick);
console.log(localStorage);
