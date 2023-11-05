/* eslint-disable require-jsdoc */
import {addContainer} from '../addContainer';
import {productListClassList} from '../data/productList';
import {Card} from '../../features/Card/Card';

export class ProductList {
  static instance = null;

  addEvents() {

  }

  constructor() {
    if (!ProductList.instance) {
      ProductList.instance = this;

      this.element = document.createElement('section');
      this.element.className = productListClassList.section;
      this.containerElement =
        addContainer(this.element, productListClassList.container);
      this.isMounted = false;
      this.addEvents();
    }

    return ProductList.instance;
  }

  updateListElem(data = []) {
    const listElem = document.createElement('ul');
    listElem.className = productListClassList.ul;

    const listItems = data.map(({id, images: [image], name: title, price}) => {
      const listItemELem = document.createElement('li');
      listItemELem.append(new Card({id, image, title, price}).create());

      return listItemELem;
    });

    listElem.append(...listItems);
    this.containerElement.append(listElem);
  }

  mount(parent, data, title) {
    this.containerElement.textContent = '';

    const titleElem = document.createElement('h2');
    titleElem.textContent = title ? title : 'Список товаров';
    titleElem.className = title ?
      productListClassList.title :
      `${productListClassList.title} visually-hidden`;

    this.containerElement.append(titleElem);
    this.updateListElem(data);

    if (this.isMounted) {
      return;
    }

    parent.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
}
