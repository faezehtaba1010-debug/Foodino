const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

const db = new Database(path.join(__dirname, "foodino.db"));

const filePath = path.join(__dirname, "..", "db.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

db.exec(`
  CREATE TABLE IF NOT EXISTS meals (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    image TEXT
  );
`);

const insertMeal = db.prepare(`
  INSERT OR REPLACE INTO meals
  (id, name, description, price, image)
  VALUES (?, ?, ?, ?, ?)
`);

const seedMeals = db.transaction((meals) => {
  for (const meal of meals) {
    insertMeal.run(
      String(meal.id),
      meal.name,
      meal.description,
      meal.price,
      meal.image
    );
  }
});

seedMeals(data.meals);

console.log(`${data.meals.length} meals imported successfully!`);

db.close();