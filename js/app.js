const sortElements = document.querySelectorAll(".search__sort-element");
const themeButton = document.getElementById("theme-toggle");
const bodyElement = document.body;

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

document.addEventListener("DOMContentLoaded", setThemeOnLoad);

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
