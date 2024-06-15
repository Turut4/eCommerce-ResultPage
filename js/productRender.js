const renderProducts = (products) => {
  const template = document.getElementById("product-template");
  const productContainer = document.getElementById("products");

  products.forEach((product) => {
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

    return productContainer.appendChild(productEl);
  });
};

const filterByPrice = (minPrice, maxPrice) => {
  minPrice = minPrice * 1;
  maxPrice = maxPrice * 1;

  return products.filter((product) => {
    price = product.price.replace(/[Rp\s.]/g, "");
    price * 1 >= minPrice && price * 1 <= maxPrice;
  });
};
const showProducts = () =>
  fetch("./js/products.json")
    .then((res) => res.json())
    .then((products) => {
      renderProducts(products);
    });

const showFilteredProducts = (minPrice, maxPrice) => {
  fetch("./js/products.json")
    .then((res) => res.json())
    .then((products) => {
      products = products.filter((product) => {
        const price = parseFloat(product.price.replace(/[Rp\s.]/g, "")); // Handle price formatting
        return price >= minPrice && price <= maxPrice;
      });
      console.log(products);
      renderProducts(products); // Call renderProducts with filtered products
    });
};

// showProducts();
showFilteredProducts(10, 2000000);
