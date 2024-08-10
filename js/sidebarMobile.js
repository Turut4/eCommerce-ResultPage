const sideBarBtn = document.querySelector(".sidebar-button");
const closeSideBar = document.getElementById("close-sidebar");

sideBarBtn.addEventListener("click", () => {
  document.getElementById("side-bar").classList.toggle("active");
});

closeSideBar.addEventListener("click", () => {
  document.getElementById("side-bar").classList.remove("active");
});
