const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// اتصال به دیتابیس SQLite
const db = new Database(path.join(__dirname, "foodino.db"));

// ساخت جدول غذاها
db.exec(`
  CREATE TABLE IF NOT EXISTS meals (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    image TEXT
  );
`);

// ساخت جدول سفارش‌ها
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer TEXT NOT NULL,
    items TEXT NOT NULL,
    totalAmount INTEGER NOT NULL,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

// دریافت لیست غذاها
app.get("/meals", (req, res) => {
  try {
    const meals = db.prepare("SELECT * FROM meals").all();
    res.json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch meals",
    });
  }
});

// دریافت سفارش‌ها
app.get("/orders", (req, res) => {
  try {
    const orders = db
      .prepare("SELECT * FROM orders ORDER BY id DESC")
      .all();

    const formattedOrders = orders.map((order) => ({
      ...order,
      customer: JSON.parse(order.customer),
      items: JSON.parse(order.items),
    }));

    res.json(formattedOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});

// ثبت سفارش جدید
app.post("/orders", (req, res) => {
  try {
    const { customer, items, totalAmount } = req.body;

    if (
      !customer ||
      typeof customer !== "object" ||
      Array.isArray(customer) ||
      !Array.isArray(items) ||
      items.length === 0 ||
      typeof totalAmount !== "number" ||
      !Number.isFinite(totalAmount) ||
      totalAmount < 0
    ) {
      return res.status(400).json({
        message: "Invalid order data",
      });
    }

    const result = db
      .prepare(`
        INSERT INTO orders (customer, items, totalAmount)
        VALUES (?, ?, ?)
      `)
      .run(
        JSON.stringify(customer),
        JSON.stringify(items),
        totalAmount
      );

    res.status(201).json({
      message: "Order registered successfully",
      id: Number(result.lastInsertRowid),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to register order",
    });
  }
});

// تست سرور
app.get("/", (req, res) => {
  res.send("Foodino API is running!");