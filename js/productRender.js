fetch("/js/products.json")
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
