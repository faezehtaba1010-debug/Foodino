import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />

      <main id="home">
        <section>
        <h2>.به فودینو خوش آمدید</h2>
        <p>.سفارش غذاهای خوشمزه را به راحتی انجام دهید</p>
        </section>

        <section id="menu">
          <h2>چی بزنیم؟</h2>
          <p>!یک لقمه تا خوشبختی</p>
        </section>
      </main>
    </>
  );
}

export default App;