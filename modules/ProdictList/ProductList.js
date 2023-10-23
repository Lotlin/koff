/* eslint-disable require-jsdoc */
import {addContainer} from '../addContainer';
import {productListClassList} from '../data/productList';
// todo убрать item (нужен для теста)
import {
  cardClassList, cardLinkHref, item, cardBtnTextContent, favoriteBtnSvg,
} from '../data/card';
import {currency} from '../data/data';

export class ProductList {
  static instance = null;

  addEvents() {

  }

  constructor() {
    if (!ProductList.instance) {
      ProductList.instance = this;

      this.element = document.createElement('section');
      this.element.className = `${productListClassList.section}`;
      this.containerElement =
        addContainer(this.element, productListClassList.container);
      this.isMounted = false;
      this.addEvents();
    }

    return ProductList.instance;
  }

  // todo передавать item аргументом

  getHTMLTemplateListItem() {
    const article = document.createElement('article');
    article.className = `${productListClassList.item} ${cardClassList.card}`;

    const linkImg = document.createElement('a');
    linkImg.className = `${cardClassList.link}`;
    linkImg.href = `${cardLinkHref}`;
    const img = new Image();
    img.className = `${cardClassList.img}`;
    img.src = item.src;
    img.alt = item.alt;
    linkImg.append(img);

    const info = document.createElement('div');
    info.classList = `${cardClassList.info}`;
    const title = document.createElement('h3');
    title.className = `${cardClassList.title}`;
    const linkInfo = document.createElement('a');
    linkInfo.className = `${cardClassList.link}`;
    linkInfo.href = `${cardLinkHref}`;
    linkInfo.textContent = item.text;
    title.append(linkInfo);
    const price = document.createElement('p');
    price.classList = `${cardClassList.price}`;
    price.textContent = `${item.price} ${currency}`;
    info.append(title, price);

    const cartButton = document.createElement('button');
    cartButton.className = `${cardClassList.cartBtn}`;
    cartButton.type = 'button';
    cartButton.textContent = cardBtnTextContent;

    const favoriteButton = document.createElement('button');
    favoriteButton.className = `${cardClassList.favoriteBtn}`;
    favoriteButton.type = 'button';
    favoriteButton.insertAdjacentHTML('beforeend', `${favoriteBtnSvg}`);

    article.append(linkImg, info, cartButton, favoriteButton);

    return article;
  }

  updateListElem(data = []) {
    const listElem = document.createElement('ul');
    listElem.className = `${productListClassList.ul}`;

    const listItems = data.map((item) => {
      const listItemELem = document.createElement('li');
      // listItemELem.innerHTML = this.getHTMLTemplateListItem(item);
      // todo передать item параметром
      listItemELem.append(this.getHTMLTemplateListItem());
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
      `${productListClassList.title}` :
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
