import MealItem from "./MealItem";
import "./Meals.css";

const meals = [
  {
    id: 1,
    name: "پیتزا مخصوص",
    description: "پیتزا با پنیر، قارچ، فلفل دلمه‌ای و سس مخصوص",
    price: 1200000,
    image:
      "https://img.magnific.com/premium-psd/pizza-with-olives-tomatoes-olives-it_1268410-858.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 2,
    name: "همبرگر ویژه",
    description: "همبرگر با گوشت تازه، کاهو، گوجه و پنیر",
    price: 644000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBXOAbWP3IkZrbNxJVPNsig3QyrZH4JC2sFMt0obb_LUUVVkyxqO1nE_fx&s=10",
  },
  {
    id: 3,
    name: "پاستا آلفردو",
    description: "پاستای ایتالیایی با سس خامه‌ای، مرغ و قارچ",
    price: 789000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0lIp0AttshJdq2R2weg4XFwJDUeKEB82YhTf4ATMKO0ybzxAktgdQia0&s=10",
  },
];

function Meals() {
  return (
    <section id="menu" className="meals">
      <h2>چی بزنیم؟</h2>

      <div className="meals-list">
        {meals.map((meal) => (
          <MealItem
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
            image={meal.image}
          />
        ))}
      </div>
    </section>
  );
}

export default Meals;