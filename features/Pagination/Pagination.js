/* eslint-disable require-jsdoc */
import {
  paginationLeftSVG, paginationRightSVG,
} from '../../modules/data/paginationData';

export class Pagination {
  static instance = null;

  constructor() {
    if (!Pagination.instance) {
      Pagination.instance = this;
      this.pagination = this.create();
    }

    return Pagination.instance;
  }

  update({currentPage, totalPages, totalProducts, limit}) {
    const width = currentPage * limit;
    this.paginationBar.style.setProperty(
        '--width',
        `calc(
          (${width < totalProducts ? width : totalProducts} / ${totalProducts})
           * 100%)`,
    );

    this.paginationCurrent.textContent =
      width < totalProducts ? width : width - limit + (totalProducts % limit);
    this.paginationTotal.textContent = totalProducts;

    const urlLeft = new URL(window.location.href);

    if (currentPage !== 1) {
      urlLeft.searchParams.set('page', currentPage - 1);
      this.paginationLeft.href = urlLeft.pathname + urlLeft.search;
    } else {
      this.paginationLeft.removeAttribute('href');
    }

    const urlRight = new URL(window.location.href);

    if (currentPage !== totalPages) {
      urlRight.searchParams.set('page', currentPage + 1);
      this.paginationRight.href = urlRight.pathname + urlRight.search;
    } else {
      this.paginationRight.removeAttribute('href');
    }

    return this;
  }

  create() {
    const pagination = document.createElement('div');
    pagination.className = 'pagination';

    this.paginationBar = document.createElement('div');
    this.paginationBar.className = 'pagination__bar';

    const paginationArrays = document.createElement('div');
    paginationArrays.className = 'pagination__arrays';

    this.paginationLeft = document.createElement('a');
    this.paginationLeft.className = 'pagination__left';
    this.paginationLeft.innerHTML = paginationLeftSVG;

    const paginationInfo = document.createElement('p');
    paginationInfo.className = 'pagination__info';

    this.paginationCurrent = document.createElement('span');
    this.paginationCurrent.className = 'pagination__current';

    const paginationSeparator = document.createTextNode('из');

    this.paginationTotal = document.createElement('span');
    this.paginationTotal.className = 'pagination__tottal';

    paginationInfo.append(
        this.paginationCurrent,
        paginationSeparator,
        this.paginationTotal,
    );

    this.paginationRight = document.createElement('a');
    this.paginationRight.className = 'pagination__right';
    this.paginationRight.innerHTML = paginationRightSVG;

    paginationArrays.append(
        this.paginationLeft,
        paginationInfo,
        this.paginationRight,
    );

    pagination.append(this.paginationBar, paginationArrays);

    return pagination;
  }

  mount(parent) {
    parent.append(this.pagination);

    return this;
  }
}
