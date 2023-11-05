/* eslint-disable require-jsdoc */

export class CartButton {
  constructor(className, text) {
    this.className = className;
    this.text = text;
  }

  create(id) {
    const cartButton = document.createElement('button');
    cartButton.className = this.className;
    cartButton.type = 'button';
    cartButton.textContent = this.text;
    cartButton.dataset.id = id;

    cartButton.addEventListener('click', () => {
      console.log('Добавить товар в корзину');
    });

    return cartButton;
  }
}
