import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1 className="logo">Foodino</h1>

      <nav className="nav">
        <a href="#home">Home</a>
        <a href="#menu">Menu</a>
      </nav>

      <button type="button" className="cart-button">
        Cart (0)
      </button>
    </header>
  );
}

export default Header;