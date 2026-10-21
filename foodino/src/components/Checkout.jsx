import { useState } from "react";
import { saveOrder } from "../orderService";
import "./Checkout.css";

export default function Checkout({
  cartItems = [],
  onSuccess,
  onCancel,
}) {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "phone") {
      // فقط اعداد مجاز هستند و شماره بیشتر از ۱۱ رقم نمی‌شود
      const numbersOnly = value.replace(/\D/g, "").slice(0, 11);

      setCustomer((prev) => ({
        ...prev,
        phone: numbersOnly,
      }));

      return;
    }

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (
      !customer.name.trim() ||
      !customer.phone.trim() ||
      !customer.address.trim()
    ) {
      setError("لطفاً تمام اطلاعات را وارد کنید.");
      return;
    }

    // شماره موبایل باید ۱۱ رقم باشد و با 09 شروع شود
    if (!/^09\d{9}$/.test(customer.phone)) {
      setError("شماره موبایل باید ۱۱ رقم باشد و با 09 شروع شود.");
      return;
    }

    if (cartItems.length === 0) {
      setError("سبد خرید خالی است.");
      return;
    }

    setIsSubmitting(true);

    try {
      const savedOrder = await saveOrder(customer, cartItems);

      alert("سفارش شما با موفقیت ثبت شد!");

      setCustomer({
        name: "",
        phone: "",
        address: "",
      });

      onSuccess?.(savedOrder);
    } catch (err) {
      setError(err.message || "ارتباط با سرور برقرار نشد.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="checkout" dir="rtl">
      <h2>ثبت سفارش</h2>

      <p>
        مبلغ کل: {totalAmount.toLocaleString("fa-IR")} تومان
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customer-name">
            نام و نام خانوادگی
          </label>

          <input
            id="customer-name"
            name="name"
            type="text"
            value={customer.name}
            onChange={handleChange}
            placeholder="نام خود را وارد کنید"
            required
          />
        </div>

        <div>
          <label htmlFor="customer-phone">
            شماره تماس
          </label>

          <input
            id="customer-phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength={11}
            value={customer.phone}
            onChange={handleChange}
            placeholder="09123456789"
            dir="ltr"
            required
          />
        </div>

        <div>
          <label htmlFor="customer-address">
            آدرس
          </label>

          <textarea
            id="customer-address"
            name="address"
            value={customer.address}
            onChange={handleChange}
            placeholder="آدرس تحویل سفارش"
            required
          />
        </div>

        {error && (
          <p role="alert" style={{ color: "red" }}>
            {error}
          </p>
        )}

        <div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "در حال ثبت سفارش..."
              : "ثبت سفارش"}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              انصراف
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
