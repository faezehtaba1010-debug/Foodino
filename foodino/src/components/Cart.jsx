import { useState } from "react";
import { useCart } from "../store/CartContext";
import Checkout from "./Checkout";
import "./Cart.css";

function Cart({ onClose }) {
  const {
    items,
    addItem,
    removeItem,
    totalPrice,
    clearCart,
  } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);

  function handleOrderSuccess() {
    // بعد از ثبت موفق سفارش، سبد خرید خالی شود
    if (typeof clearCart === "function") {
      clearCart();
    }

    setShowCheckout(false);
    onClose?.();
  }

  return (
    <div className="cart-overlay" onClick={onClose}>
      <section
        className="cart-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onClick={(event) => event.stopPropagation()}
      >
        {showCheckout ? (
          <Checkout
            cartItems={items}
            onSuccess={handleOrderSuccess}
            onCancel={() => setShowCheckout(false)}
          />
        ) : (
          <>
            <div className="cart-heading">
              <h2 id="cart-title">سبد خرید شما</h2>

              <button
                type="button"
                className="cart-close"
                onClick={onClose}
                aria-label="بستن سبد خرید"
              >
                ×
              </button>
            </div>

            {items.length === 0 ? (
              <p className="cart-empty">
                سبد خرید شما خالی است.
              </p>
            ) : (
              <div className="cart-items">
                {items.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div>
                      <h3>{item.name}</h3>

                      <p>
                        {Number(item.price).toLocaleString("fa-IR")} تومان
                      </p>
                    </div>

                    <div className="cart-quantity">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`کم کردن ${item.name}`}
                      >
                        −
                      </button>

                      <span>
                        {Number(item.quantity).toLocaleString("fa-IR")}
                      </span>

                      <button
                        type="button"
                        onClick={() => addItem(item)}
                        aria-label={`زیاد کردن ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="cart-footer">
              <strong>
                مبلغ کل: {Number(totalPrice).toLocaleString("fa-IR")} تومان
              </strong>

              {items.length > 0 && (
                <button
                  type="button"
                  className="cart-done"
                  onClick={() => setShowCheckout(true)}
                >
                  ادامه و ثبت سفارش
                </button>
              )}

              <button
                type="button"
                className="cart-done"
                onClick={onClose}
              >
                بستن
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Cart;
