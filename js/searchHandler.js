const searchBoxButton = document.getElementById("search-btn");
const searchBox = document.getElementById("search-box");
const closeBtn = document.querySelector(".close-search");
const text_input = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn--opened");
const productResultDiv = document.getElementById("product-results");
const itemsQtdDescription = document.querySelector(".filter-text--description");

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
    clearProductContainer();
  });
}

text_input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clearProductContainer();
  itemsQtdDescription.innerHTML = "";
  const search_input = text_input.value.toLowerCase();
  getJson().then((data) => {
    const filteredProducts = data.filter((product) => {
      return (
        product.name.toLowerCase().includes(search_input) ||
        product.description.toLowerCase().includes(search_input)
      );
    });

    if (filteredProducts.length === 0) {
      itemsQtdDescription.innerHTML = `<span>No Results</span>`;
    } else {
      if (filteredProducts.length <= PRODUCTS_PER_PAGE) {
        currentPage = 1;
      }
      renderProducts(filteredProducts);
      itemsQtdDescription.innerHTML = `<span>Results for: ${text_input.value}</span>`;
    }
  });
});
