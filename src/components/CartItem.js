import { Component } from "../common/Component.js";

export class CartItem extends Component {
  render() {
    const { item, cartContext } = this.props;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="cart-item__image" />
      <div class="cart-item__details">
        <h4 class="cart-item__title">${item.title}</h4>
        <p class="cart-item__price">$${item.price.toFixed(2)}</p>
      </div>
      <div class="cart-item__quantity">
        <button class="cart-item__qty-btn cart-item__qty-btn--minus">−</button>
        <span class="cart-item__qty-value">${item.quantity}</span>
        <button class="cart-item__qty-btn cart-item__qty-btn--plus">+</button>
      </div>
      <button class="cart-item__remove">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;

    const minusBtn = cartItem.querySelector(".cart-item__qty-btn--minus");
    const plusBtn = cartItem.querySelector(".cart-item__qty-btn--plus");
    const removeBtn = cartItem.querySelector(".cart-item__remove");

    minusBtn.addEventListener("click", () => {
      cartContext.updateQuantity(item.id, item.quantity - 1);
    });

    plusBtn.addEventListener("click", () => {
      cartContext.updateQuantity(item.id, item.quantity + 1);
    });

    removeBtn.addEventListener("click", () => {
      cartContext.removeProduct(item.id);
    });

    return cartItem;
  }
}
