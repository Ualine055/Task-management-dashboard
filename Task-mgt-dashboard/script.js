let tasks = JSON.parse(localStorage.getItem("tasks")) || [  
  { name: "Finish assignment", dueDate: "2025-09-30", completed: false },
  { name: "Buy groceries", dueDate: "2025-09-28", completed: true },
  { name: "Team meeting", dueDate: "2025-09-29", completed: false },
  { name: "Doctor appointment", dueDate: "2025-10-01", completed: false },
  { name: "Read a book", dueDate: "2025-10-02", completed: false }
];

let editIndex = null; // Used to remember which task is being edited

// ====== Save to LocalStorage ======
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ====== Render Tasks ======
function renderTasks(filter = "all") {
  const tasksList = document.getElementById("tasksList");
  tasksList.innerHTML = ""; // Clear the list before showing again

  // Filtering tasks (all / completed / pending)
  let filteredTasks = tasks;
  if (filter === "completed") {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (filter === "pending") {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  // If no tasks found
  if (filteredTasks.length === 0) {
    tasksList.innerHTML = `<p class="text-gray-400 text-center">No tasks found</p>`;
    return;
  }

  // Show each task
  filteredTasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = `task-card rounded-lg p-4 flex justify-between items-center 
      transition-all duration-300 transform max-w-4xl mt-0 mx-auto hover:scale-[1.02]
      ${task.completed ? "completed" : ""} 
      ${isOverdue(task.dueDate) && !task.completed ? "overdue" : ""}`;

    taskDiv.innerHTML = `
      <div>
        <h3 class="font-semibold">${task.name}</h3>
        <p class="text-sm text-gray-400">Due: ${task.dueDate || "No date"}</p>
      </div>
      <div class="flex gap-2">
        <button onclick="toggleTask(${index})" class="px-3 py-1 bg-green-600 rounded hover:bg-green-700">
          ${task.completed ? "Undo" : "Done"}
        </button>
        <button onclick="openEditModal(${index})" class="px-3 py-1 bg-yellow-600 rounded hover:bg-yellow-700">Edit</button>
        <button onclick="deleteTask(${index})" class="px-3 py-1 bg-red-600 rounded hover:bg-red-700">Delete</button>
      </div>
    `;
    tasksList.appendChild(taskDiv);
  });
}
// ====== Add Task ======
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const dueDateInput = document.getElementById("dueDateInput");

  // Validation (cannot be empty)
  if (taskInput.value.trim() === "") {
    alert("Task name cannot be empty!");
    return;
  }

  // Add new task to array
  tasks.push({
    name: taskInput.value,
    dueDate: dueDateInput.value,
    completed: false
  });

  // Reset inputs
  taskInput.value = "";
  dueDateInput.value = "";

  saveTasks(); // Save to LocalStorage
  renderTasks(); // Show updated list
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}


function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1); // Remove from array
    saveTasks();
    renderTasks();
  }
}

// ====== Edit Task ======
function openEditModal(index) {
  editIndex = index;
  document.getElementById("editTaskInput").value = tasks[index].name;
  document.getElementById("editDueDateInput").value = tasks[index].dueDate;
  document.getElementById("editModal").classList.remove("hidden");
  document.getElementById("editModal").classList.add("flex");
}

function saveEdit() {
  const newName = document.getElementById("editTaskInput").value.trim();
  const newDate = document.getElementById("editDueDateInput").value;

  if (newName === "") {
    alert("Task name cannot be empty!");
    return;
  }

  tasks[editIndex].name = newName;
  tasks[editIndex].dueDate = newDate;

  closeModal();
  saveTasks();
  renderTasks();
}

function cancelEdit() {
  closeModal();
}

function closeModal() {
  document.getElementById("editModal").classList.add("hidden");
  document.getElementById("editModal").classList.remove("flex");
}

function filterTasks(type) {
  renderTasks(type);
}

function sortTasks(type) {
  if (type === "date") {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else if (type === "name") {
    tasks.sort((a, b) => a.name.localeCompare(b.name));
  }
  saveTasks();
  renderTasks();
}

function isOverdue(date) {
  if (!date) return false;
  const today = new Date().toISOString().split("T")[0];
  return date < today;
}

renderTasks();


