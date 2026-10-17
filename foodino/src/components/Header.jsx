import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1 className="logo">فودینو</h1>

      <nav className="nav">
        <a href="#home">خانه</a>
        <a href="#menu">چی بزنیم؟</a>
      </nav>

      <button type="button" className="cart-button">
        سبد خرید (۰)
      </button>
    </header>
  );
}

export default Header;