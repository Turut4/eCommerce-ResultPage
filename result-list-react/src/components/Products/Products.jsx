import "./Products.css";
import products from "./products.json";

export default function ProductsList() {
  return (
    <div className="products-list">
      {products.map((p) => (
        <Product
          key={p.name}
          name={p.name}
          description={p.description}
          price={p.price}
          discount={p.discount}
          image={p.image}
        />
      ))}
    </div>
  );
}

function Product({ name, description, price, discount, image }) {
  let oldPrice;
  if (discount) {
    const productPrice = Number(price.split(".").join(""));
    const productDiscount = Number(discount.replace("%", ""));
    oldPrice = String(productPrice - (productPrice / 100) * productDiscount);
  }

  return (
    <div style={{ width: "301px" }}>
      <img src={image} />
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
        <p style={{ fontWeight: "600", fontSize: "20px" }}>Rp {price}</p>
        {discount && (
          <p style={{ textDecoration: "line-through", color: "#B0B0B0" }}>
            Rp {oldPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </p>
        )}
      </div>
    </div>
  );
}
