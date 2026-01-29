import { Component } from "../common/Component.js";
import { CartItem } from "./CartItem.js";

export class CartList extends Component {
  constructor(props) {
    super(props);
    this.isOpen = false;
  }

  render() {
    const { cartContext } = this.props;

    const cartOverlay = document.createElement("div");
    cartOverlay.className = "cart-overlay";
    cartOverlay.id = "cart-overlay";

    const cartSidebar = document.createElement("aside");
    cartSidebar.className = "cart-sidebar";
    cartSidebar.id = "cart-sidebar";

    this.renderCartContent(cartSidebar, cartContext);

    cartOverlay.addEventListener("click", () => this.close());

    cartContext.subscribe(() => {
      this.renderCartContent(cartSidebar, cartContext);
    });

    const fragment = document.createDocumentFragment();
    fragment.appendChild(cartOverlay);
    fragment.appendChild(cartSidebar);

    return fragment;
  }

  renderCartContent(container, cartContext) {
    const items = cartContext.getItems();
    const totalItems = cartContext.getTotalItems();
    const totalPrice = cartContext.getTotalPrice();

    container.innerHTML = `
      <div class="cart-sidebar__header">
        <h2 class="cart-sidebar__title">Your Cart (${totalItems})</h2>
        <button class="cart-sidebar__close" id="cart-close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="cart-sidebar__items" id="cart-items"></div>
      <div class="cart-sidebar__footer">
        <div class="cart-sidebar__total">
          <span>Total</span>
          <span>$${totalPrice.toFixed(2)}</span>
        </div>
        <button class="cart-sidebar__checkout" ${items.length === 0 ? "disabled" : ""}>
          Checkout
        </button>
      </div>
    `;

    const itemsContainer = container.querySelector("#cart-items");
    const closeBtn = container.querySelector("#cart-close");

    if (items.length === 0) {
      itemsContainer.innerHTML = `
        <div class="cart-sidebar__empty">
          <p>Your cart is empty</p>
        </div>
      `;
    } else {
      items.forEach((item) => {
        const cartItem = new CartItem({ item, cartContext });
        cartItem.mount(itemsContainer);
      });
    }

    closeBtn.addEventListener("click", () => this.close());
  }

  open() {
    this.isOpen = true;
    document.getElementById("cart-overlay")?.classList.add("cart-overlay--active");
    document.getElementById("cart-sidebar")?.classList.add("cart-sidebar--open");
    document.body.style.overflow = "hidden";
  }

  close() {
    this.isOpen = false;
    document.getElementById("cart-overlay")?.classList.remove("cart-overlay--active");
    document.getElementById("cart-sidebar")?.classList.remove("cart-sidebar--open");
    document.body.style.overflow = "";
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}
