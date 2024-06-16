const openFilter = document.getElementById("filterBtn");
const minPriceBox = document.getElementById("minPrice");
const maxPriceBox = document.getElementById("maxPrice");
const filterBox = document.getElementById("filter-box");
const applyFilter = document.getElementById("apply-filter");

if (openFilter) {
  openFilter.addEventListener("click", (e) => {
    e.preventDefault();
    filterBox.classList.toggle("active");
  });
}

if (filterBox) {
  applyFilter.addEventListener("click", (e) => {
    clearProductContainer();
    e.preventDefault();
    const minPrice = minPriceBox.value * 1;
    const maxPrice = maxPriceBox.value * 1;
    if (minPrice === 0 && maxPrice === 0) {
      showProducts();
    } else if (minPrice > 0 && maxPrice === 0) {
      showProductsFilteredByPrice(minPrice, 100000000000);
    } else if (minPrice === 0 && maxPrice > 0) {
      showProductsFilteredByPrice(0, maxPrice);
    } else showProductsFilteredByPrice(minPrice, maxPrice);
  });
}
