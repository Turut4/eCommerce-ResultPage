const searchBoxButton = document.getElementById("search-btn");
const searchBox = document.getElementById("search-box");
const closeBtn = document.querySelector(".close-search");
const text_input = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn--opened");

if (searchBoxButton) {
  searchBoxButton.addEventListener("click", (e) => {
    e.preventDefault();
    searchBox.classList.toggle("active");
  });
}

if (closeBtn) {
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    searchBox.classList.remove("active");
    showProducts();
    text_input.value = "";
  });
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clearProductContainer();
  const search_input = text_input.value.toLowerCase();
  getJson().then((data) => {
    const filteredProducts = data.filter((product) => {
      return (
        product.name.toLowerCase().includes(search_input) ||
        product.description.toLowerCase().includes(search_input)
      );
    });
    renderProducts(filteredProducts);
    console.log(filteredProducts);
  });
});
