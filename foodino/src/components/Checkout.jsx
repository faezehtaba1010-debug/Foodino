import { useState } from "react";
import { useCart } from "../store/CartContext";
import "./Checkout.css";

function Checkout({ onCancel, onClose }) {
  const { items, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    let newValue = value;

    if (name === "phone") {
      newValue = value.replace(/\D/g, "").slice(0, 11);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim()
    ) {
      setError("لطفاً تمام فیلدها را تکمیل کنید.");
      return;
    }

    if (!/^09\d{9}$/.test(formData.phone)) {
      setError("شماره موبایل باید ۱۱ رقم باشد و با ۰۹ شروع شود.");
      return;
    }

    if (items.length === 0) {
      setError("سبد خرید شما خالی است.");
      return;
    }

    const order = {
      customer: {
        name: formData.name.trim(),
        phone: formData.phone,
        address: formData.address.trim(),
      },
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice,
      createdAt: new Date().toISOString(),
    };

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error("ثبت سفارش ناموفق بود.");
      }

      clearCart();
      setIsSuccess(true);
    } catch (error) {
      setError("ارتباط با سرور برقرار نشد. دوباره تلاش کنید.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <section className="checkout">
        <h2>سفارش شما ثبت شد!</h2>
        <p>سفارش شما با موفقیت در سیستم ذخیره شد.</p>

        <button
          type="button"
          className="checkout-success-button"
          onClick={onClose}
        >
          بازگشت به صفحه اصلی
        </button>
      </section>
    );
  }

  return (
    <section className="checkout">
      <h2>اطلاعات ثبت سفارش</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="customer-name">
            نام و نام خانوادگی
          </label>

          <input
            id="customer-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="نام و نام خانوادگی خود را وارد کنید"
          />
        </div>

        <div className="form-group">
          <label htmlFor="customer-phone">
            شماره تماس
          </label>

          <input
            id="customer-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="09123456789"
            maxLength={11}
            inputMode="numeric"
            autoComplete="tel"
            dir="ltr"
          />
        </div>

        <div className="form-group">
          <label htmlFor="customer-address">
            آدرس تحویل
          </label>

          <textarea
            id="customer-address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="آدرس کامل خود را وارد کنید"
            rows="4"
          />
        </div>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <p className="checkout-total">
          مبلغ سفارش: {totalPrice.toLocaleString("fa-IR")} تومان
        </p>

        <div className="checkout-actions">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            بازگشت به سبد خرید
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "در حال ثبت سفارش..." : "ثبت نهایی سفارش"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Checkout;