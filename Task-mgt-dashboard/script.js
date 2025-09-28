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
