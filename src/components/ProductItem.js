import { Component } from "../common/Component.js";

export class ProductItem extends Component {
  render() {
    const { product, cartContext } = this.props;

    const item = document.createElement("article");
    item.className = "product-item";

    item.innerHTML = `
      <div class="product-item__image-container">
        <img
          src="${product.image}"
          alt="${product.title}"
          class="product-item__image"
          loading="lazy"
        />
        <button class="product-item__add-btn" title="Add to cart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
      <div class="product-item__info">
        <span class="product-item__category">${product.category}</span>
        <h3 class="product-item__title">${product.title}</h3>
        <p class="product-item__price">$${product.price.toFixed(2)}</p>
      </div>
    `;

    const addBtn = item.querySelector(".product-item__add-btn");
    addBtn.addEventListener("click", () => {
      cartContext.addProduct(product);
      this.showAddedFeedback(addBtn);
    });

    return item;
  }

  showAddedFeedback(button) {
    button.classList.add("product-item__add-btn--added");
    button.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;

    setTimeout(() => {
      button.classList.remove("product-item__add-btn--added");
      button.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      `;
    }, 1500);
  }
}
