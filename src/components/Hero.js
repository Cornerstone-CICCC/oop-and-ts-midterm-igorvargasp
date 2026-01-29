import { Component } from "../common/Component.js";

export class Hero extends Component {
  render() {
    const hero = document.createElement("section");
    hero.className = "hero";

    hero.innerHTML = `
      <h1 class="hero__title">Get Inspired</h1>
      <p class="hero__subtitle">
        Browsing for your next long-haul trip, everyday journey, or just fancy a look at what's
        new? From community favourites to about-to-sell-out items, see them all here.
      </p>
    `;

    return hero;
  }
}
