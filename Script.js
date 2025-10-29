const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  if (taskInput.value === "") return alert("Enter a task!");

  const li = document.createElement("li");
  li.textContent = taskInput.value;

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.className = "deleteBtn";
  delBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.appendChild(delBtn);
  taskList.appendChild(li);
  saveTasks();
  taskInput.value = "";
}

function saveTasks() {
  localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
  taskList.innerHTML = localStorage.getItem("tasks") || "";
}

function filterTasks(type) {
  const tasks = taskList.querySelectorAll("li");
  tasks.forEach(task => {
    if (type === "all") task.style.display = "flex";
    else if (type === "completed")
      task.style.display = task.classList.contains("completed") ? "flex" : "none";
    else if (type === "pending")
      task.style.display = !task.classList.contains("completed") ? "flex" : "none";
  });
}