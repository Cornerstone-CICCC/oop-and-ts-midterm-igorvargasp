export class CartContext {
  constructor() {
    this.items = [];
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.items));
  }

  addProduct(product) {
    const existingItem = this.items.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }

    this.notify();
  }

  updateQuantity(id, quantity) {
    const item = this.items.find((item) => item.id === id);

    if (item) {
      if (quantity <= 0) {
        this.removeProduct(id);
      } else {
        item.quantity = quantity;
        this.notify();
      }
    }
  }

  removeProduct(id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.notify();
  }

  getItems() {
    return this.items;
  }

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  clearCart() {
    this.items = [];
    this.notify();
  }
}
