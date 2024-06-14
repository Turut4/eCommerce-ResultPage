const filterProductsByPrice = (products, minPrice, maxPrice) => {
  minPrice = minPrice * 1;
  maxPrice = maxPrice * 1;
  return products.filter((p) => {
    const price = parseInt(p.price.replace(/[Rp\s.]/g, ""));
    return price >= minPrice && price <= maxPrice;
  });
};

const orderProductsByPrice = (products) => {
  return products.sort((a, b) => {
    const priceA = a.price.toUpperCase();
    const priceB = b.price.toUpperCase();
    return priceA < priceB ? -1 : priceA > priceB ? 1 : 0;
  });
};

fetch("./js/products.json")
  .then((res) => res.json())
  .then((products) => {
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
        productEl.querySelector(".discount").textContent = product.discount;
      } else {
        productEl.querySelector(".discount").style.display = "none";
      }

      if (product.tag) {
        productEl.querySelector(".tag").textContent = product.tag;
      } else {
        productEl.querySelector(".tag").style.display = "none";
      }

      productContainer.appendChild(productEl);
    });
  });
