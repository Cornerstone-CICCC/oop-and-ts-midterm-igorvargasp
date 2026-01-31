import { Component } from "../common/Component.js";

export class Header extends Component {
  render() {
    const header = document.createElement("header");
    header.className = "header";

    header.innerHTML = `
      <div class="header__container">
        <a href="#" class="header__logo">
          <svg class="header__logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="12" r="5"/>
            <circle cx="15" cy="12" r="5"/>
          </svg>
          <span class="header__logo-text">Engaging</span>
        </a>

        <nav class="header__nav">
          <a href="#" class="header__nav-link header__nav-link--active">Shop</a>
          <a href="#" class="header__nav-link">Collections</a>
          <a href="#" class="header__nav-link">Explore</a>
          <button class="header__nav-more">•••</button>
        </nav>

        <div class="header__actions">
          <button class="header__cart" id="cart-toggle">
            <svg class="header__cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="6" width="18" height="15" rx="2"/>
              <path d="M8 6V5a4 4 0 0 1 8 0v1"/>
            </svg>
            <span>Cart</span>
            <span class="header__cart-count" id="cart-count">0</span>
          </button>
          <a href="#" class="header__account">
            <svg class="header__account-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
            </svg>
            <span>My account</span>
          </a>
        </div>
      </div>
    `;

    return header;
  }

  updateCartCount(count) {
    const cartCountEl = document.getElementById("cart-count");
    if (cartCountEl) {
      cartCountEl.textContent = count;
    }
  }
}
