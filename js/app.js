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

const togglePopup = () => {
  taskPopupBackground.classList.toggle("active");
  taskPopup.classList.toggle("active");
}
newTaskButton.onclick = () => {
  togglePopup()
};

cancelTaskButton.onclick = () => {
  togglePopup()
};

const getTaskTemplate = (title) => {
  return `<li class="task">
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
                          <button class="task__action task__edit-action">
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.67272 5.99106L2 12.6637V16H5.33636L12.0091 9.32736M8.67272 5.99106L11.0654 3.59837L11.0669 3.59695C11.3962 3.26759 11.5612 3.10261 11.7514 3.04082C11.9189 2.98639 12.0993 2.98639 12.2669 3.04082C12.4569 3.10257 12.6217 3.26735 12.9506 3.59625L14.4018 5.04738C14.7321 5.37769 14.8973 5.54292 14.9592 5.73337C15.0136 5.90088 15.0136 6.08133 14.9592 6.24885C14.8974 6.43916 14.7324 6.60414 14.4025 6.93398L14.4018 6.93468L12.0091 9.32736M8.67272 5.99106L12.0091 9.32736"
                                stroke="#CDCDCD"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </button>
                          <button class="task__action task__delete-action">
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



const tasks = [
  { title: "Вынести мусор", done: false },
  { title: "Приготовить обед", done: false },
  { title: "Сходить в зал", done: true },
];

tasks.forEach((task) => {
  tasksList.insertAdjacentHTML(
    'beforeend',
    getTaskTemplate(task.title))
})

applyTaskButton.onclick = () => {
  if (popupInput.value.length === 0) {
    console.log(123);
  } else {
    tasksList.insertAdjacentHTML(
      "beforeend",
      getTaskTemplate(popupInput.value)
    );
    popupInput.value = '';
    togglePopup()
  }
};

