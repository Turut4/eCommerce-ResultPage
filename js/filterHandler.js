const openFilter = document.getElementById("filterBtn");
const minPriceBox = document.getElementById("minPrice");
const maxPriceBox = document.getElementById("maxPrice");
const filterBox = document.getElementById("filter-box");
const applyFilter = document.getElementById("apply-filter");
const orderAlphaBtn = document.getElementById("order-alpha");
const orderPriceBtnHigher = document.getElementById("order-price-higher");
const orderPriceBtnLower = document.getElementById("order-price-lower");
const clearFilterBtn = document.getElementById("clear-filters");

const clearFilter = () => {
  minPriceBox.value = "";
  maxPriceBox.value = "";
  orderAlphaBtn.classList.remove("active");
  orderPriceBtnHigher.classList.remove("active");
  orderPriceBtnLower.classList.remove("active");
};
const clearFilterButtons = () => {
  orderAlphaBtn.classList.remove("active");
  orderPriceBtnHigher.classList.remove("active");
  orderPriceBtnLower.classList.remove("active");
};

if (openFilter) {
  openFilter.addEventListener("click", (e) => {
    e.preventDefault();
    filterBox.classList.toggle("active");
  });
}

if (filterBox) {
  applyFilter.addEventListener("click", (e) => {
    clearProductContainer();
    clearFilterButtons();
    e.preventDefault();
    const minPrice = minPriceBox.value * 1;
    const maxPrice = maxPriceBox.value * 1;
    if (minPrice === 0 && maxPrice === 0) {
      showProducts();
    } else if (minPrice > 0 && maxPrice === 0) {
      showProductsFilteredByPrice(minPrice, Infinity);
    } else if (minPrice === 0 && maxPrice > 0) {
      showProductsFilteredByPrice(0, maxPrice);
    } else showProductsFilteredByPrice(minPrice, maxPrice);
  });
}

if (orderAlphaBtn) {
  orderAlphaBtn.addEventListener("click", (e) => {
    clearFilter();
    clearProductContainer();
    e.preventDefault();
    orderAlphaBtn.classList.toggle("active");
    showAllProductsOrderedByName();
  });
}

if (orderPriceBtnLower) {
  orderPriceBtnLower.addEventListener("click", (e) => {
    clearFilter();
    clearProductContainer();
    e.preventDefault();
    orderPriceBtnLower.classList.toggle("active");
    showAllProductsOrderedByPrice();
  });
}

if (orderPriceBtnHigher) {
  orderPriceBtnHigher.addEventListener("click", (e) => {
    clearFilter();
    clearProductContainer();
    e.preventDefault();
    orderPriceBtnHigher.classList.toggle("active");
    showAllProductsOrderedByPriceReverse();
  });
}

if (clearFilterBtn) {
  clearFilterBtn.addEventListener("click", () => {
    clearFilter();
    clearProductContainer();
    showProducts();
  });
}