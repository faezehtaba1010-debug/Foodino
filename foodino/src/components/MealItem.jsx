import { useCart } from "../store/CartContext";
import "./MealItem.css";

function MealItem({ id, name, description, price, image }) {
  const { addItem } = useCart();

  function handleAddToCart() {
    addItem({
      id,
      name,
      price,
      image,
    });
  }

  return (
    <article className="meal-item">
      <img
        src={image}
        alt={name}
        className="meal-image"
      />

      <div className="meal-info">
        <h3>{name}</h3>

        <p>{description}</p>

        <span className="meal-price">
          {price.toLocaleString("fa-IR")} تومان
        </span>
      </div>

      <button
        type="button"
        className="add-button"
        onClick={handleAddToCart}
      >
        افزودن به سبد خرید +
      </button>
    </article>
  );
}

export default MealItem;