/* eslint-disable require-jsdoc */
import {productListClassList} from '../../modules/data/productList';
import {
  cardClassList, cardBtnTextContent,
} from '../../modules/data/card';
import {currency} from '../../modules/data/data';
import {API_URL} from '../../const';
import {CartButton} from '../CartButton/CartButton';
import {LikeButton} from '../LikeButton/LikeButton';

export class Card {
  constructor({id, image, title, price}) {
    this.id = id;
    this.image = image;
    this.title = title;
    this.price = price;
    this.cartButton = new CartButton(cardClassList.cartBtn, cardBtnTextContent);
    this.likeButton = new LikeButton(cardClassList.favoriteBtn);
  }

  create() {
    const article = document.createElement('article');
    article.className = `${productListClassList.item} ${cardClassList.card}`;

    const linkImg = document.createElement('a');
    linkImg.className = cardClassList.link;
    linkImg.href = `/product/${this.id}`;
    const img = new Image();
    img.className = cardClassList.img;
    img.src = `${API_URL}${this.image}`;
    img.alt = this.title;
    linkImg.append(img);

    const info = document.createElement('div');
    info.classList = cardClassList.info;
    const title = document.createElement('h3');
    title.className = cardClassList.title;
    const linkInfo = document.createElement('a');
    linkInfo.className = cardClassList.link;
    linkInfo.href = `/product/${this.id}`;
    linkInfo.textContent = this.title;
    title.append(linkInfo);
    const priceElem = document.createElement('p');
    priceElem.classList = cardClassList.price;
    priceElem.textContent = `${this.price.toLocaleString()}\u00A0${currency}`;
    info.append(title, priceElem);

    const btnCart = this.cartButton.create(this.id);
    const btnFavorite = this.likeButton.create(this.id);

    article.append(linkImg, info, btnCart, btnFavorite);

    return article;
  }
}
