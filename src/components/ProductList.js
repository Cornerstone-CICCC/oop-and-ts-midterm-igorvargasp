import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.products = [];
    this.filteredProducts = [];
    this.gridContainer = null;
  }

  render() {
    const section = document.createElement("section");
    section.className = "product-list";

    section.innerHTML = `
      <div class="product-list__container">
        <div class="product-list__header">
          <div class="product-list__hero">
            <h1 class="product-list__title">Get Inspired</h1>
            <p class="product-list__subtitle">
              Browsing for your next favorite item, or just fancy a look at what's
              new? From community favorites to about-to-sell-out items, see them all here.
            </p>
          </div>
        </div>
        <div class="product-list__grid" id="product-grid">
          <div class="product-list__loading">Loading products...</div>
        </div>
      </div>
    `;

    this.gridContainer = section.querySelector("#product-grid");
    this.fetchProducts();

    return section;
  }

  async fetchProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      this.products = await response.json();
      this.filteredProducts = [...this.products];
      this.renderProducts();
    } catch (error) {
      this.gridContainer.innerHTML = `
        <div class="product-list__error">
          <p>Failed to load products. Please try again later.</p>
          <button class="product-list__retry" onclick="location.reload()">Retry</button>
        </div>
      `;
    }
  }

  renderProducts() {
    this.gridContainer.innerHTML = "";

    if (this.filteredProducts.length === 0) {
      this.gridContainer.innerHTML = `
        <div class="product-list__empty">
          <p>No products found matching your filters.</p>
        </div>
      `;
      return;
    }

    this.filteredProducts.forEach((product) => {
      const productItem = new ProductItem({
        product,
        cartContext: this.props.cartContext,
      });
      productItem.mount(this.gridContainer);
    });
  }

  applyFilters(filters) {
    this.filteredProducts = this.products.filter((product) => {
      if (filters.category !== "all" && product.category !== filters.category) {
        return false;
      }

      if (product.price < filters.priceMin || product.price > filters.priceMax) {
        return false;
      }

      return true;
    });

    this.sortProducts(filters.sort);
    this.renderProducts();
  }

  sortProducts(sortBy) {
    switch (sortBy) {
      case "price-low":
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        this.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        this.filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "newest":
      default:
        this.filteredProducts.sort((a, b) => b.id - a.id);
        break;
    }
  }
}
