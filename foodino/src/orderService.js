const ORDERS_URL = "http://localhost:3001/orders";

export async function saveOrder(customer, cartItems) {
  if (!cartItems || cartItems.length === 0) {
    throw new Error("سبد خرید خالی است.");
  }

  const totalAmount = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.quantity),
    0
  );

  const order = {
    customer,
    items: cartItems,
    totalAmount,
    createdAt: new Date().toISOString(),
  };

  const response = await fetch(ORDERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error("سفارش ذخیره نشد.");
  }

  return await response.json();
}