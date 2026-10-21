
import { createContext, useContext, useReducer } from "react";

// ساخت Context برای سبد خرید
const CartContext = createContext();

// وضعیت اولیه سبد خرید
const initialState = {
  items: [],
};

// مدیریت تغییرات سبد خرید
function cartReducer(state, action) {
  // اضافه کردن غذا
  if (action.type === "ADD_ITEM") {
    const existingItem = state.items.find(
      (item) => item.id === action.item.id
    );

    if (existingItem) {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.item.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    return {
      ...state,
      items: [
        ...state.items,
        {
          ...action.item,
          quantity: 1,
        },
      ],
    };
  }

  // کم کردن تعداد غذا
  if (action.type === "REMOVE_ITEM") {
    const existingItem = state.items.find(
      (item) => item.id === action.id
    );

    if (!existingItem) {
      return state;
    }

    if (existingItem.quantity === 1) {
      return {
        ...state,
        items: state.items.filter(
          (item) => item.id !== action.id
        ),
      };
    }

    return {
      ...state,
      items: state.items.map((item) =>
        item.id === action.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    };
  }

  // خالی کردن سبد خرید
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      items: [],
    };
  }

  return state;
}

// فراهم کردن اطلاعات سبد برای کامپوننت‌ها
export function CartProvider({ children }) {
  const [cartState, dispatch] = useReducer(
    cartReducer,
    initialState
  );

  function addItem(item) {
    dispatch({
      type: "ADD_ITEM",
      item,
    });
  }

  function removeItem(id) {
    dispatch({
      type: "REMOVE_ITEM",
      id,
    });
  }

  function clearCart() {
    dispatch({
      type: "CLEAR_CART",
    });
  }

  // تعداد کل غذاها
  const totalQuantity = cartState.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // مبلغ کل سفارش
  const totalPrice = cartState.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: cartState.items,
        addItem,
        removeItem,
        clearCart,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// هوک اختصاصی دسترسی به سبد خرید
export function useCart() {
  return useContext(CartContext);
}
