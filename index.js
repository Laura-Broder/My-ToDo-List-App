const addButton = document.querySelector(".addNew");
const deleteButton = document.querySelector(".deleteAll");
const theList = document.querySelector(".theList");
const saveButton = document.querySelector(".save");
const deleteCompletedButton = document.querySelector(".deleteCompleted");
const editTaskButtonsList = document.querySelectorAll(".editTask");
let tasksArray = theList.children;
console.log(tasksArray);

function createTaskObj(taskForm) {
  let d = new Date();
  let taskObj = {};
  taskObj.taskContent = taskForm.textArea.value;
  taskObj.taskPriority = taskForm.querySelector(
    'input[type="radio"]:checked',
  ).value;
  taskObj.creationDate = d.toLocaleDateString("en-GB");

  taskObj.taskHTML = `<div class="task">
          <input type="checkbox" name="task"/>
          <span>
            ${taskObj.taskContent}
          </span>
          <div>
            <p class="priority" data-priority="${taskObj.taskPriority}">Task Priority: ${taskObj.taskPriority}</p>
            <p class="date" data-date="date">Creation Date: ${taskObj.creationDate}</p>
          </div>
          <button type="button" class="editTask">Edit Task</button>
        <hr>
        </div>`;

  // taskObj.editTask = function () {
  //   const editTaskFormHTML = `<div class="editTaskContainer">
  //         <form name="editNewTaskForm">
  //           <label for="taskContent">New Task Content:</label>
  //           <textarea id="textArea" name="textArea">${this.taskContent} </textarea>
  //           <label for="taskPriority">New Task Priority:</label>
  //           <div>
  //             <input
  //               type="radio"
  //               id="low"
  //               name="priority"
  //               value="low"
  //               checked
  //             />
  //             <label for="low">Low</label>
  //             <input type="radio" id="medium" name="priority" value="medium" />
  //             <label for="medium">Medium</label>
  //             <input type="radio" id="high" name="priority" value="high" />
  //             <label for="high">High</label>
  //           </div>
  //           <input type="button" class="save" value="Save" />
  //         </form>
  //       </div>`;
  //   this.insertAdjacentHTML("beforebegin", editTaskFormHTML);
  // };
  return taskObj;
}
function addTaskToList(taskObj) {
  theList.insertAdjacentHTML("beforeend", taskObj.taskHTML);
  console.log(tasksArray);
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
  theList.innerHTML = "All Done Here!!!";
}
function handleSaveClick() {
  const newTaskForm = document.querySelector('[name="addNewTaskForm"');
  const taskToAdd = createTaskObj(newTaskForm);
  if (tasksArray.length === 0) theList.innerHTML = "";
  if (!(taskToAdd.taskContent === "")) {
    addTaskToList(taskToAdd);
    clearForm(newTaskForm);
  }
}
function handleDeleteCompletedClick() {
  document.querySelector('input[type="checkbox"]:checked') &&
    document
      .querySelectorAll('input[type="checkbox"]:checked')
      .forEach((completedTask) => completedTask.parentElement.remove());

  if (tasksArray.length === 0) theList.innerHTML = "All Done Here!!!";
}
function handleEditTaskButtonClick(event) {
  console.log(event.currentTarget.parentElement);
  event.currentTarget.parentElement.editTask();
}

// add event listeners to the buttons
addButton.addEventListener("click", handleAddClick);
deleteButton.addEventListener("click", handleDeleteClick);
saveButton.addEventListener("click", handleSaveClick);
deleteCompletedButton.addEventListener("click", handleDeleteCompletedClick);
editTaskButtonsList.forEach((btn) =>
  btn.addEventListener("click", handleEditTaskButtonClick),
);
