const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const errorMessage = document.querySelector("#error-message");
const filterButtons = document.querySelectorAll("[data-filter]");

let tasks = [
  { id: 1, title: "HTML 구조 복습", completed: true },
  { id: 2, title: "JavaScript 배열 연습", completed: false },
];
let nextId = 3;
let currentFilter = "all";

function addTask(title) {
  tasks.push({ id: nextId++, title, completed: false });
  renderTasks();
}

function toggleTask(id) {
  const task = tasks.find((item) => item.id === id);
  if (!task) return;
  task.completed = !task.completed;
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((item) => item.id !== id);
  renderTasks();
}

function getVisibleTasks() {
  if (currentFilter === "active") return tasks.filter((task) => !task.completed);
  if (currentFilter === "completed") return tasks.filter((task) => task.completed);
  return tasks;
}

function setFilter(filter) {
  currentFilter = filter;
  filterButtons.forEach((button) => {
    const selected = button.dataset.filter === currentFilter;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  const visibleTasks = getVisibleTasks();

  if (visibleTasks.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "현재 조건에 맞는 학습 항목이 없습니다.";
    taskList.append(empty);
    return;
  }

  visibleTasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `task-item${task.completed ? " completed" : ""}`;
    const title = document.createElement("span");
    title.textContent = task.title;
    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.textContent = task.completed ? "되돌리기" : "완료";
    toggleButton.addEventListener("click", () => toggleTask(task.id));
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete";
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => deleteTask(task.id));
    item.append(title, toggleButton, deleteButton);
    taskList.append(item);
  });
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const result = validateTaskInput(taskInput.value);

  if (!result.valid) {
    errorMessage.textContent = result.message;
    return;
  }

  addTask(result.value);
  errorMessage.textContent = "";
  taskInput.value = "";
  taskInput.focus();
});

filterButtons.forEach((button) => button.addEventListener("click", () => setFilter(button.dataset.filter)));
setFilter("all");

