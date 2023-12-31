/* eslint-disable require-jsdoc */
import {ApiService} from '../../sevices/ApiService';
import {addContainer} from '../addContainer';
import {catalogClassList} from '../data/catalogData';

export class Catalog {
  static instance = null;

  constructor() {
    if (!Catalog.instance) {
      Catalog.instance = this;

      this.element = document.createElement('nav');
      this.element.className = catalogClassList.nav;
      this.containerElement =
        addContainer(this.element, catalogClassList.container);
      this.isMounted = false;
    }

    return Catalog.instance;
  }

  async getData() {
    this.catalogData = await new ApiService().getProductCategories();
  }

  renderListElem(data) {
    const listElem = document.createElement('ul');
    listElem.className = catalogClassList.ul;

    const listItems = data.map(item => {
      const listItemELem = document.createElement('li');
      listItemELem.className = catalogClassList.li;
      const link = document.createElement('a');
      link.className = catalogClassList.link;
      link.href = `/category?slug=${item}`;
      link.textContent = item;

      listItemELem.append(link);
      return listItemELem;
    });

    listElem.prepend(...listItems);

    this.containerElement.append(listElem);
  }

  async mount(parent) {
    if (this.isMounted) {
      return;
    }

    if (!this.catalogData) {
      await this.getData();
      this.renderListElem(this.catalogData);
    }

    parent.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
}
