import { Component } from "../common/Component.js";

export class Filters extends Component {
  constructor(props) {
    super(props);
    this.filters = {
      category: "all",
      priceMin: 0,
      priceMax: 1000,
      sort: "newest",
    };
  }

  render() {
    const filters = document.createElement("section");
    filters.className = "filters";

    filters.innerHTML = `
      <div class="filters__container">
        <div class="filters__group">
          <div class="filter-dropdown">
            <label class="filter-dropdown__label">Category</label>
            <select class="filter-dropdown__select" id="filter-category">
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>

          <div class="filter-dropdown">
            <label class="filter-dropdown__label">Price</label>
            <select class="filter-dropdown__select" id="filter-price">
              <option value="0-1000">All Prices</option>
              <option value="0-25">$0 - $25</option>
              <option value="25-50">$25 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-1000">$100+</option>
            </select>
          </div>

          <div class="filter-dropdown">
            <label class="filter-dropdown__label">Sort</label>
            <select class="filter-dropdown__select" id="filter-sort">
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>

        <button class="filters__reset" id="filter-reset">Reset Filters</button>
      </div>
    `;

    this.attachEventListeners(filters);

    return filters;
  }

  attachEventListeners(container) {
    const categorySelect = container.querySelector("#filter-category");
    const priceSelect = container.querySelector("#filter-price");
    const sortSelect = container.querySelector("#filter-sort");
    const resetBtn = container.querySelector("#filter-reset");

    categorySelect.addEventListener("change", (e) => {
      this.filters.category = e.target.value;
      this.notifyChange();
    });

    priceSelect.addEventListener("change", (e) => {
      const [min, max] = e.target.value.split("-").map(Number);
      this.filters.priceMin = min;
      this.filters.priceMax = max;
      this.notifyChange();
    });

    sortSelect.addEventListener("change", (e) => {
      this.filters.sort = e.target.value;
      this.notifyChange();
    });

    resetBtn.addEventListener("click", () => {
      this.resetFilters();
      categorySelect.value = "all";
      priceSelect.value = "0-1000";
      sortSelect.value = "newest";
    });
  }

  notifyChange() {
    if (this.props.onFilterChange) {
      this.props.onFilterChange(this.filters);
    }
  }

  resetFilters() {
    this.filters = {
      category: "all",
      priceMin: 0,
      priceMax: 1000,
      sort: "newest",
    };
    this.notifyChange();
  }

  getFilters() {
    return this.filters;
  }
}
