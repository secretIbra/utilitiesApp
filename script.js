// Get all nav links and app containers
const navLinks = document.querySelectorAll(".navbar a");
const appContainers = document.querySelectorAll(".app");

// Function to toggle active app
function toggleApp(appToShow) {
  // Deactivate all apps and nav links
  appContainers.forEach((app) => app.classList.remove("active"));
  navLinks.forEach((link) => link.classList.remove("active"));

  // Activate the selected app and nav link
  const selectedApp = document.getElementById(appToShow);
  const selectedLink = document.getElementById(`${appToShow}Btn`);

  if (selectedApp && selectedLink) {
    selectedApp.classList.add("active");
    selectedLink.classList.add("active");
  }
}

// Add click event listeners to all nav links
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default link behavior
    const appToShow = link.id.replace("Btn", "");
    toggleApp(appToShow);
  });
});

// Set initial active app (e.g., 'ageCalculator')
toggleApp("ageCalculator");

// ... (rest of your existing code for individual app functionalities)

// Age Calculator
const ageResult = document.getElementById("result");
const submitBtn = document.querySelector(".submit-btn");

function calculateAge() {
  let year = document.getElementById("year");
  let month = document.getElementById("month");
  let day = document.getElementById("date");

  let birthDate = new Date(year.value, month.value - 1, day.value);
  let currentDate = new Date();

  if (!year.value || !month.value || !day.value) {
    ageResult.innerHTML = "Please fill in all fields (Day, Month, and Year).";
    return;
  }

  if (birthDate > currentDate) {
    ageResult.innerHTML =
      "Birth date is in the future. Please enter a valid date.";
    return;
  }

  let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
  let ageMonths = currentDate.getMonth() - birthDate.getMonth();
  let ageDays = currentDate.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    ageDays += 30;
  }
  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  ageResult.innerHTML = `Your age is ${ageYears} years, ${ageMonths} months, and ${ageDays} days`;
}

submitBtn.addEventListener("click", calculateAge);

// Standard Calculator
// Calculator functionality
const display = document.getElementById("calc-display");
const buttons = document.querySelectorAll("#standardCalculator .btn");
const clearBtn = document.querySelector("#standardCalculator .clear");
const equalBtn = document.querySelector("#standardCalculator .equal");

// Allow direct input
display.addEventListener("input", function () {
  // Optional: You can add input validation here if needed
});

// Update display when buttons are clicked
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    if (this.innerHTML !== "=" && this.innerHTML !== "clear") {
      display.value += this.innerHTML;
    }
  });
});

// Clear display
clearBtn.addEventListener("click", function () {
  display.value = "";
});

// Calculate result
equalBtn.addEventListener("click", calculate);

function calculate() {
  try {
    // Use Function constructor instead of eval for better security
    const result = new Function("return " + display.value)();
    display.value = result;
  } catch (error) {
    display.value = "Error";
  }
}

// Handle keyboard input
display.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    calculate();
  }
});

// Digital Clock
const todays = document.querySelector(".todays_date");
const timeDisplay = document.querySelector(".time");
const ampmDisplay = document.querySelector(".ampm");

const daysList = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  let ampm = hours >= 12 ? "PM" : "AM";
  let displayHours = hours % 12 || 12; // Convert to 12-hour format

  todays.innerHTML = daysList[now.getDay()];
  timeDisplay.innerHTML = `${padZero(displayHours)} : ${padZero(
    minutes
  )} : ${padZero(seconds)}`;
  ampmDisplay.innerHTML = ampm;
}

function padZero(num) {
  return num.toString().padStart(2, "0");
}

updateClock();
setInterval(updateClock, 1000);

// Initial app state
toggleApp("age");

//  stopwatch functionality
const pauseBtn = document.querySelector(".Pause");
const resetBtn = document.querySelector(".Reset");
const stopwatchDisplay = document.querySelector(".timer-display");
const startBtn = document.querySelector(".Start");

let timeInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;

startBtn.addEventListener("click", function () {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    startTiming();
    isRunning = true;
  }
});

pauseBtn.addEventListener("click", pauseTiming);

resetBtn.addEventListener("click", function () {
  clearInterval(timeInterval);
  elapsedTime = 0;
  stopwatchDisplay.innerHTML = "00 : 00 : 00 : 000";
  isRunning = false;
});

function pauseTiming() {
  if (isRunning) {
    clearInterval(timeInterval);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
  }
}

function startTiming() {
  timeInterval = setInterval(updateTime, 10);
}

function updateTime() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  const hours = Math.floor(elapsedTime / 3600000);
  const minutes = Math.floor((elapsedTime % 3600000) / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);

  stopwatchDisplay.innerHTML = `${padZero(hours)} : ${padZero(
    minutes
  )} : ${padZero(seconds)} : ${padZero(milliseconds)}`;
}

function padZero(num) {
  return num.toString().padStart(2, "0");
}
let city = "";

// https://api.openweathermap.org/data/2.5/weather?q=cairo&units=metric&APPID=28fd15358cdecbc1a1dfef367e71acef

const input = document.querySelector(".search");
const searchbtn = document.querySelector(".searchbtn");

const temp = document.querySelector(".temp");
const cloud = document.querySelector(".weather");
const cityy = document.querySelector(".city");

searchbtn.addEventListener("click", () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=28fd15358cdecbc1a1dfef367e71acef`;

  console.log(city);

  fetch(url)
    .then((res) => {
      console.log(res);

      return res.json();
    })
    .then((data) => {
      console.log(data);
      cityy.innerHTML = data.name + " , " + data.sys.country;
      temp.innerHTML = data.main.temp;
      cloud.innerHTML = data.weather[0].main;
    });
});

input.addEventListener("input", (e) => {
  city = e.target.value;
});

/// To-Do List functionality
// To-Do List functionality
// To-Do List functionality with drag and drop (no icon)
class TodoList {
  constructor() {
    this.tasks = [];
    this.inputBox = document.getElementById("input-box");
    this.listContainer = document.getElementById("list-container");
    this.searchBox = document.getElementById("search-box");
    this.addButton = document.querySelector(".todo-app button");

    this.addEventListeners();
    this.loadData();
  }

  addEventListeners() {
    this.addButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.addTask();
    });

    this.inputBox.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.addTask();
      }
    });

    this.searchBox.addEventListener("input", () => this.searchTasks());

    this.listContainer.addEventListener("dragstart", (e) => this.dragStart(e));
    this.listContainer.addEventListener("dragover", (e) => this.dragOver(e));
    this.listContainer.addEventListener("drop", (e) => this.drop(e));
  }

  addTask() {
    const taskText = this.inputBox.value.trim();
    if (taskText === "") {
      alert("You must write something");
      return;
    }

    this.tasks.push({ text: taskText, completed: false });
    this.inputBox.value = "";
    this.renderTasks();
    this.saveData();
  }

  renderTasks(tasksToRender = this.tasks) {
    this.listContainer.innerHTML = "";
    tasksToRender.forEach((task, index) => {
      const li = this.createTaskElement(task, index);
      this.listContainer.appendChild(li);
    });
  }

  createTaskElement(task, index) {
    const li = document.createElement("li");
    li.draggable = true;
    li.dataset.index = index;
    if (task.completed) li.classList.add("checked");

    li.innerHTML = `
          <span class="task-text">${task.text}</span>
          <div class="task-actions">
              <span class="edit">&#9998;</span>
              <span class="delete">&#215;</span>
          </div>
      `;

    li.querySelector(".edit").onclick = (e) => {
      e.stopPropagation();
      this.startEditing(index);
    };

    li.querySelector(".delete").onclick = (e) => {
      e.stopPropagation();
      this.deleteTask(index);
    };

    // Change this line to capture clicks on the entire li element
    li.onclick = (e) => {
      // Only toggle if we didn't click on edit or delete buttons
      if (
        !e.target.classList.contains("edit") &&
        !e.target.classList.contains("delete")
      ) {
        this.toggleTask(index);
      }
    };

    return li;
  }
  toggleTask(index) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.renderTasks();
    this.saveData();
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.renderTasks();
    this.saveData();
  }

  startEditing(index) {
    const li = this.listContainer.children[index];
    const taskText = li.querySelector(".task-text");
    const currentText = taskText.textContent;

    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.className = "edit-input";

    li.insertBefore(input, taskText);
    li.removeChild(taskText);
    input.focus();

    input.addEventListener("blur", () => this.finishEditing(index, input));
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.finishEditing(index, input);
    });

    input.onclick = (e) => e.stopPropagation();
  }

  finishEditing(index, input) {
    const newText = input.value.trim();
    if (newText !== "") {
      this.tasks[index].text = newText;
      this.renderTasks();
      this.saveData();
    } else {
      this.renderTasks();
    }
  }

  searchTasks() {
    const searchTerm = this.searchBox.value.toLowerCase();
    const filteredTasks = this.tasks.filter((task) =>
      task.text.toLowerCase().includes(searchTerm)
    );
    this.renderTasks(filteredTasks);
  }

  saveData() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  loadData() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
      this.renderTasks();
    }
  }

  dragStart(e) {
    if (e.target.tagName === "LI") {
      e.dataTransfer.setData("text/plain", e.target.dataset.index);
      setTimeout(() => {
        e.target.classList.add("dragging");
      }, 0);
    }
  }

  dragOver(e) {
    e.preventDefault();
    const draggingElement = this.listContainer.querySelector(".dragging");
    if (draggingElement) {
      const closestTask = this.getClosestTask(this.listContainer, e.clientY);
      if (closestTask) {
        this.listContainer.insertBefore(draggingElement, closestTask);
      } else {
        this.listContainer.appendChild(draggingElement);
      }
    }
  }

  getClosestTask(container, y) {
    const draggableElements = [
      ...container.querySelectorAll("li:not(.dragging)"),
    ];
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  drop(e) {
    e.preventDefault();
    const draggedElement = this.listContainer.querySelector(".dragging");
    if (draggedElement) {
      draggedElement.classList.remove("dragging");
      this.updateTasksOrder();
    }
  }

  updateTasksOrder() {
    const newOrder = Array.from(this.listContainer.children).map((li) =>
      parseInt(li.dataset.index)
    );
    this.tasks = newOrder.map((index) => this.tasks[index]);
    this.renderTasks();
    this.saveData();
  }
}

// Initialize the TodoList when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  new TodoList();
});
