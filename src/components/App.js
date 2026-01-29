import { Component } from "../common/Component.js";
import { Header } from "./Header.js";
import { Hero } from "./Hero.js";
import { ProductList } from "./ProductList.js";
import { CartList } from "./CartList.js";

export class App extends Component {
  render() {
    const app = document.createElement("div");
    app.className = "app";

    const header = new Header({ cartContext: this.props.cartContext });
    header.mount(app);

    const hero = new Hero();
    hero.mount(app);

    const productList = new ProductList({ cartContext: this.props.cartContext });
    productList.mount(app);

    const cartList = new CartList({ cartContext: this.props.cartContext });
    cartList.mount(app);

    // Wire up cart toggle button (query within app, not document)
    const cartToggle = app.querySelector("#cart-toggle");
    if (cartToggle) {
      cartToggle.addEventListener("click", () => cartList.toggle());
    }

    let previousCount = 0;

    this.props.cartContext.subscribe(() => {
      const currentCount = this.props.cartContext.getTotalItems();
      header.updateCartCount(currentCount);

      if (currentCount > previousCount) {
        cartList.open();
      }

      previousCount = currentCount;
    });

    return app;
  }
}
