import { Component } from "../common/Component.js";
import { Header } from "./Header.js";
import { Hero } from "./Hero.js";

export class App extends Component {
  render() {
    const app = document.createElement("div");
    app.className = "app";

    const header = new Header({ cartContext: this.props.cartContext });
    header.mount(app);

    const hero = new Hero();
    hero.mount(app);

    return app;
  }
}
