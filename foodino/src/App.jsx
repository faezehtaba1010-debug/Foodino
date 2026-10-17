import Header from "./components/Header";
import Meals from "./components/Meals";

function App() {
  return (
    <div dir="rtl" lang="fa">
      <Header />

      <main id="home">
        <section className="welcome">
          <h2>به فودینو خوش آمدید!</h2>
          <p>
            غذات رو راحت سفارش بده.
          </p>
        </section>

        <Meals />
      </main>
    </div>
  );
}

export default App;