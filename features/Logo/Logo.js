/* eslint-disable require-jsdoc */
import logoImg from '/img/logo.svg';
import {
  logoClassList, logoLinkHref, logoAlt,
} from '../../modules/data/logoData';

export class Logo {
  constructor(parentClassName) {
    this.parentClassName = parentClassName;
  }

  create() {
    const logo = document.createElement('a');
    logo.className = `${this.parentClassName}__${logoClassList.logoLink}`;
    logo.href = `${logoLinkHref}`;

    const imgLogo = new Image();
    imgLogo.className = `${this.parentClassName}__${logoClassList.img}`;
    imgLogo.src = logoImg;
    imgLogo.alt = `${logoAlt}`;

    logo.append(imgLogo);

    return logo;
  }
}
