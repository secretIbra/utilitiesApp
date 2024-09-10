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

// To-Do List functionality
// To-Do List functionality
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const searchBox = document.getElementById("search-box");
const addButton = document.querySelector(".todo-app button");

function addTask() {
  if (inputBox.value.trim() === "") {
    alert("You must write something");
    return;
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let editSpan = document.createElement("span");
    editSpan.innerHTML = "\u270E"; // Pencil icon
    editSpan.className = "edit";
    li.appendChild(editSpan);

    let deleteSpan = document.createElement("span");
    deleteSpan.innerHTML = "\u00d7"; // Cross icon
    deleteSpan.className = "delete";
    li.appendChild(deleteSpan);

    inputBox.value = "";
    saveData();
  }
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.className === "delete") {
      e.target.parentElement.remove();
      saveData();
    } else if (e.target.className === "edit") {
      editTask(e.target.parentElement);
    }
  },
  false
);

function editTask(li) {
  const taskText = li.firstChild.textContent;
  inputBox.value = taskText;
  li.remove();
  saveData();
}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

function searchTasks() {
  const searchTerm = searchBox.value.toLowerCase();
  const tasks = listContainer.getElementsByTagName("li");

  Array.from(tasks).forEach(function (task) {
    const taskText = task.firstChild.textContent.toLowerCase();
    if (taskText.includes(searchTerm)) {
      task.style.display = "";
    } else {
      task.style.display = "none";
    }
  });
}

showTask();

// Add event listener to the "Add" button
document.querySelector(".todo-app button").addEventListener("click", addTask);

addButton.addEventListener("click", function (event) {
  event.preventDefault();
  addTask();
});

inputBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});

// Add event listener for search input
searchBox.addEventListener("input", searchTasks);
