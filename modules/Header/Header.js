/* eslint-disable require-jsdoc */
import {addContainer} from '../addContainer';
import logoImg from '/img/logo.svg';
import {
  headerClassList, headerLinks, searchSVG, linkFavoriteTextContent,
  favoriteSVG, linkCartTextContent, goodsAmountTextContent, cartSVG,
} from '../data/headerData';
import {logoAlt} from '../data/companyData';

export class Header {
  static instance = null;

  constructor() {
    if (!Header.instance) {
      Header.instance = this;

      this.element = document.createElement('header');
      this.element.classList.add(`${headerClassList.header}`);
      this.containerElement =
        addContainer(this.element, `${headerClassList.container}`);
      this.isMounted = false;
    }

    return Header.instance;
  }

  getLogo() {
    const logo = document.createElement('a');
    logo.className = `${headerClassList.logoLink}`;
    logo.href = `${headerLinks.logoLinkHref}`;

    const imgLogo = new Image();
    imgLogo.className = `${headerClassList.logo}`;
    imgLogo.src = logoImg;
    imgLogo.alt = `${logoAlt}`;

    logo.append(imgLogo);

    return logo;
  }

  getSearchForm() {
    const searchForm = document.createElement('form');
    searchForm.className = `${headerClassList.searchForm}`;
    // searchForm.action = '/api/product';
    searchForm.method = 'GET';

    const input = document.createElement('input');
    input.className = `${headerClassList.searchFormInput}`;
    input.type = 'search';
    input.name = 'search';
    input.placeholder = 'Введите запрос';

    const button = document.createElement('button');
    button.className = `${headerClassList.searchBtn}`;
    button.type = 'submit';
    button.innerHTML = `${searchSVG}`;

    searchForm.append(input);
    searchForm.append(button);

    return searchForm;
  }

  getNavigation() {
    const navigation = document.createElement('nav');
    navigation.className = `${headerClassList.navigation}`;

    const linkFavorite = document.createElement('a');
    linkFavorite.className = `${headerClassList.link}`;
    linkFavorite.href = `${headerLinks.favorite}`;
    const spanLinkFavorite = document.createElement('span');
    spanLinkFavorite.className = `${headerClassList.linkSpan}`;
    spanLinkFavorite.textContent = `${linkFavoriteTextContent}`;

    linkFavorite.append(spanLinkFavorite);
    linkFavorite.insertAdjacentHTML('beforeend', `${favoriteSVG}`);

    const linkCart = document.createElement('a');
    linkCart.className = `${headerClassList.link}`;
    linkCart.href = `${headerLinks.cart}`;
    const spanTextLinkCart = document.createElement('span');
    spanTextLinkCart.className = `${headerClassList.linkSpan}`;
    spanTextLinkCart.textContent = `${linkCartTextContent}`;
    const spanTextLinkCount = document.createElement('span');
    spanTextLinkCount.className = `${headerClassList.goodsAmount}`;
    spanTextLinkCount.textContent = `${goodsAmountTextContent}`;

    linkCart.append(spanTextLinkCart);
    linkCart.append(spanTextLinkCount);
    linkCart.insertAdjacentHTML('beforeend', `${cartSVG}`);

    navigation.append(linkFavorite);
    navigation.append(linkCart);

    this.countElement = spanTextLinkCount;
    return navigation;
  }

  changeCount(n) {
    // todo get n
    this.countElement.textContent = `(${n})`;
  }

  mount() {
    if (this.isMounted) {
      return;
    }

    const logo = this.getLogo();
    const searchForm = this.getSearchForm();
    const navigation = this.getNavigation();

    this.containerElement.append(logo, searchForm, navigation);

    document.body.append(this.element);

    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
}
