window.onload = () => {
  showProducts();
};

let PRODUCTS_PER_PAGE = 16;
let currentPage = 1;

const clearProductContainer = () => {
  const productContainer = document.getElementById("products");
  productResultDiv.innerHTML = "";
  productContainer.innerHTML = "";
};

const getJson = async () => {
  data = await fetch("./js/products.json").then((res) => res.json());
  return data;
};

const renderProducts = (products, page) => {
  page = currentPage || 1;
  const template = document.getElementById("product-template");
  const productContainer = document.getElementById("products");
  clearProductContainer();
  const start = (page - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;
  const productsToRender = Object.values(products).slice(start, end);
  itemsQtdDescription.textContent = `Showing ${start + 1}-${
    end < Object.values(products).length ? end : Object.values(products).length
  } of ${Object.values(products).length} Results`;

  productsToRender.forEach((product) => {
    const productEl = document.importNode(template.content, true);

    productEl.querySelector(".product-name").textContent = product.name;
    productEl.querySelector(".product-description").textContent =
      product.description;
    productEl.querySelector(".price").textContent = product.price;

    const image = productEl.querySelector("#product-image");
    image.src = `./img/${product.image}`;
    image.alt = product.name;
    if (product.old_price) {
      productEl.querySelector(".old-price").textContent = product.old_price;
    } else {
      productEl.querySelector(".old-price").style.display = "none";
    }

    if (product.discount) {
      productEl.querySelector(".discount").textContent = `-${product.discount}`;
    } else {
      productEl.querySelector(".discount").style.display = "none";
    }

    if (product.tag) {
      productEl.querySelector(".tag").textContent = product.tag;
    } else {
      productEl.querySelector(".tag").style.display = "none";
    }

    productContainer.appendChild(productEl);
    renderPagination(Object.values(products).length);
  });
};

const renderPagination = (totalProducts) => {
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.id = `pagination-button-${i}`;
    if (i === currentPage) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => {
      currentPage = i;
      if (orderAlphaBtn.classList.contains("active")) {
        showAllProductsOrderedByName();
      } else if (orderPriceBtnLower.classList.contains("active")) {
        showAllProductsOrderedByPrice();
      } else if (orderPriceBtnHigher.classList.contains("active")) {
        showAllProductsOrderedByPriceReverse();
      } else if (applyFilter.classList.contains("active")) {
        applyFilter.click();
      } else showProducts();
      button.classList.toggle("active");
      window.scrollTo(0, 300);
    });
    paginationContainer.appendChild(button);
  }

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      if (orderAlphaBtn.classList.contains("active")) {
        showAllProductsOrderedByName();
      } else if (orderPriceBtnLower.classList.contains("active")) {
        showAllProductsOrderedByPrice();
      } else if (orderPriceBtnHigher.classList.contains("active")) {
        showAllProductsOrderedByPriceReverse();
      } else showProducts();
      window.scrollTo(0, 300);
    }
  });

  paginationContainer.appendChild(nextButton);
};

const showProducts = () => {
  getJson().then((products) => {
    renderProducts(products);
  });
};

const showProductsFilteredByPrice = (minPrice, maxPrice) => {
  minPrice = minPrice || 0;
  maxPrice = maxPrice || Infinity;
  getJson().then((products) => {
    products = products
      .filter((product) => {
        const price = parseFloat(product.price.replace(/[Rp\s.]/g, ""));
        return price >= minPrice && price <= maxPrice;
      })
      .sort((a, b) => {
        priceA = a.price.replace(/[Rp\s.]/g, "");
        priceB = b.price.replace(/[Rp\s.]/g, "");
        return priceA - priceB;
      });
    if (!products.length) {
      itemsQtdDescription.innerHTML = `<span>No Results</span>`;
      return;
    }
    renderProducts(products);
  });
};

const showAllProductsOrderedByName = () => {
  getJson().then((products) => {
    products = products.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    renderProducts(products);
  });
};

const showAllProductsOrderedByPrice = () => {
  getJson().then((products) => {
    products = products.sort((a, b) => {
      priceA = a.price.replace(/[Rp\s.]/g, "");
      priceB = b.price.replace(/[Rp\s.]/g, "");
      return priceA - priceB;
    });
    renderProducts(products);
  });
};

const showAllProductsOrderedByPriceReverse = () => {
  getJson().then((products) => {
    products = products.sort((a, b) => {
      priceA = a.price.replace(/[Rp\s.]/g, "");
      priceB = b.price.replace(/[Rp\s.]/g, "");
      return priceB - priceA;
    });
    renderProducts(products);
  });
};
