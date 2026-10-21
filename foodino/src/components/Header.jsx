import { useState } from "react";
import { useCart } from "../store/CartContext";
import Cart from "./Cart";
import "./Header.css";

function Header() {
  const { totalQuantity } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="header">
        <h1 className="logo">فودینو</h1>

        <nav className="nav">
          <a href="#home">خانه</a>
          <a href="#menu">منوی غذاها</a>
        </nav>

        <button
          type="button"
          className="cart-button"
          onClick={() => setIsCartOpen(true)}
        >
          سبد خرید ({totalQuantity.toLocaleString("fa-IR")})
        </button>
      </header>

      {isCartOpen && (
        <Cart onClose={() => setIsCartOpen(false)} />
      )}
    </>
  );
}

export default Header;          