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