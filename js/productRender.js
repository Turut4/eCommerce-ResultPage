window.onload = () => {
  showProducts();
};

const PRODUCTS_PER_PAGE = 8;
let currentPage = 1;

const clearProductContainer = () => {
  const productContainer = document.getElementById("products");
  productResultDiv.innerHTML = "";
  productContainer.innerHTML = "";
};

const getJson = () => {
  return fetch("./js/products.json").then((res) => res.json());
};

const renderProducts = (products, page) => {
  page = currentPage || 1;
  const template = document.getElementById("product-template");
  const productContainer = document.getElementById("products");
  clearProductContainer();
  const start = (page - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;
  const productsToRender = Object.values(products).slice(start, end);
  const itemsQtdDescription = document.querySelector(
    ".filter-text--description"
  );
  itemsQtdDescription.textContent = `Showing ${start + 1}-${end} of ${
    Object.values(products).length
  } Results`;

  console.log(page);
  console.log(start);
  console.log(end);
  console.log(productsToRender);

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
    button.addEventListener("click", () => {
      currentPage = i;
      if (orderAlphaBtn.classList.contains("active")) {
        showAllProductsOrderedByName();
      } else if (orderPriceBtnLower.classList.contains("active")) {
        showAllProductsOrderedByPrice();
      } else if (orderPriceBtnHigher.classList.contains("active")) {
        showAllProductsOrderedByPriceReverse();
      } else showProducts();
    });
    paginationContainer.appendChild(button);
  }
};

const showProducts = () => {
  getJson().then((products) => {
    renderProducts(products);
  });
};

const showProductsFilteredByPrice = (minPrice, maxPrice) => {
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
      products = document.getElementById("products");
      products.innerHTML = '<p class="no-results">No results found</p>';
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
