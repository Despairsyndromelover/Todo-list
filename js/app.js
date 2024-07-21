const sortElements = document.querySelectorAll(".search__sort-element");
const themeButton = document.getElementById("theme-toggle");
const bodyElement = document.body;

// ! THEME FUNCTIONAL
const toggleTheme = () => {
  bodyElement.classList.toggle("dark-theme");

  if (bodyElement.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
};

const setThemeOnLoad = () => {
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    document.body.classList.add("dark-theme");
  }
};
setThemeOnLoad();

const sortElementStyle = () => {
  if (bodyElement.classList.contains("dark-theme")) {
    sortElements.forEach((element) => {
      element.style.backgroundColor = "#252525";
      element.style.color = "#f7f7f7";
    });
  } else {
    sortElements.forEach((element) => {
      element.style.backgroundColor = "#f7f7f7";
      element.style.color = "#6c63ff";
    });
  }
};

sortElements.forEach((element) => {
  element.addEventListener("click", () => console.log("123"));
});

sortElementStyle();

themeButton.onclick = () => {
  bodyElement.classList.toggle("dark-theme");
  bodyElement.classList.remove("light-theme");

  const theme = bodyElement.classList.contains("dark-theme") ? "dark" : "light";
  localStorage.setItem("theme", theme);
  sortElementStyle();
};

// ! POPUP FUNCTIONAL

const newTaskButton = document.getElementById("open-popup");
const cancelTaskButton = document.getElementById("cancel-popup");
const applyTaskButton = document.getElementById("apply-popup");
const taskPopupBackground = document.getElementById("popupBG");
const taskPopup = document.getElementById("popup");
const popupInput = document.getElementById("popup-input");
const tasksList = document.getElementById("tasks-list");
const fakeCheckbox = document.getElementsByClassName("fake-task__checkbox");
const togglePopup = () => {
  taskPopupBackground.classList.toggle("active");
  taskPopup.classList.toggle("active");
};

newTaskButton.onclick = () => {
  togglePopup();
};
cancelTaskButton.onclick = () => {
  togglePopup();
};

const getTaskTemplate = (title, index) => {
  return `<li class="task" id="${index}">
                      <div class="task__wrapper">
                        <div class="task__content">
                          <label class="task__checkbox-label">
                            <input
                              type="checkbox"
                              name="checkbox"
                              id="checkbox"
                              class="fake-task__checkbox"
                            />
                            <span class="real-task__checkbox"
                              ><img src="img/checkboxArrow.svg" alt=""
                            /></span>
                            <h2 class="task__title title">${title}</h2>
                          </label>
                        </div>

                        <div class="task__actions">
                          <button class="task__action task__delete-action" id=${index}>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.87414 7.61505C3.80712 6.74386 4.49595 6 5.36971 6H12.63C13.5039 6 14.1927 6.74385 14.1257 7.61505L13.6064 14.365C13.5463 15.1465 12.8946 15.75 12.1108 15.75H5.88894C5.10514 15.75 4.45348 15.1465 4.39336 14.365L3.87414 7.61505Z"
                                stroke="#CDCDCD"
                              />
                              <path
                                d="M14.625 3.75H3.375"
                                stroke="#CDCDCD"
                                stroke-linecap="round"
                              />
                              <path
                                d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z"
                                stroke="#CDCDCD"
                              />
                              <path
                                d="M10.5 9V12.75"
                                stroke="#CDCDCD"
                                stroke-linecap="round"
                              />
                              <path
                                d="M7.5 9V12.75"
                                stroke="#CDCDCD"
                                stroke-linecap="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>`;
};

const newTask = (title) => {
  return {
    title: title,
    done: false,
  };
};

const tasks = [];
const setTasks = () => localStorage.setItem("tasks", JSON.stringify(tasks));
let tasksInStorage = JSON.parse(localStorage.getItem("tasks"));
const checkTasks = () => {
  if (tasksInStorage) {
    tasksInStorage.forEach((task) => {
      tasks.push(task);
    });
  }
};
checkTasks();

tasks.forEach((task, index) => {
  tasksList.insertAdjacentHTML("beforeend", getTaskTemplate(task.title, index));

  if (task.done) {
    tasksList.children[index].classList.add("done");
    checkboxDoneState();
  } else {
    tasksList.children[index].classList.remove("done");
    checkboxNotDoneState();
  }
});

let tasksCheckboxes = document.querySelectorAll(".real-task__checkbox");
function checkboxDoneState() {
  let tasksCheckboxes = document.querySelectorAll(".real-task__checkbox");
  tasksCheckboxes.forEach((checkbox, index) => {
    tasksCheckboxes[index].classList.add("checkbox-done");
  });
}
function checkboxNotDoneState() {
  let tasksCheckboxes = document.querySelectorAll(".real-task__checkbox");
  tasksCheckboxes.forEach((checkbox, index) => {
    tasksCheckboxes[index].classList.remove("checkbox-done");
  });
}

const updateTaskState = () => {
  tasksCheckboxes.forEach((checkbox, index) => {
    checkbox.onclick = () => {
      tasks[index].done = true;
      if (tasks[index].done) {
        checkbox.parentElement.classList.toggle("done");
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }

      if (!checkbox.parentElement.classList.contains("done")) {
        tasks[index].done = false;
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }

      if (tasks[index].done) {
        tasksList.children[index].classList.add("done");
        tasksCheckboxes[index].classList.add("checkbox-done");
        localStorage.setItem("tasks", JSON.stringify(tasks));
      } else {
        tasksList.children[index].classList.remove("done");
        tasksCheckboxes[index].classList.remove("checkbox-done");
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    };
  });
};
updateTaskState();

const deleteTask = () => {
  const deleteTasksButtons = document.querySelectorAll(".task__delete-action");

  deleteTasksButtons.forEach((button) => {
    button.onclick = () => {
      const taskItem = button.closest('.task');
      if (taskItem) {
        const index = Array.from(deleteTasksButtons).indexOf(button); 
        tasks.splice(index, 1);
        taskItem.remove();
        setTasks();
        deleteTask();
        updateTaskState(); 
      }
    };
  });
};
deleteTask();
applyTaskButton.onclick = () => {
  if (popupInput.value.length === 0) {
    return null;
  } else {
    tasks.push(newTask(popupInput.value));
    tasksList.insertAdjacentHTML(
      "beforeend",
      getTaskTemplate(popupInput.value, tasks.length - 1)
    );
    popupInput.value = "";
    togglePopup();
    tasksCheckboxes = document.querySelectorAll(".real-task__checkbox");
    updateTaskState();
    setTasks();
    deleteTask();
  }
};

// ! Live search functionality

document.querySelector("#search").oninput = function () {
  let value = this.value.trim();
  let tasksForSearch = document.querySelectorAll(".task");
  if (value != "") {
    tasksForSearch.forEach((task) => {
      if (task.textContent.search(value) == -1) {
        task.classList.add("hidden");
      } else {
        task.classList.remove("hidden");
      }
    });
  } else {
    tasksForSearch.forEach((task) => {
      task.classList.remove("hidden");
    });
  }
};
