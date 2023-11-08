/* eslint-disable require-jsdoc */
import {router} from '../../main';
import {addContainer} from '../../modules/addContainer';
import {
  breadCrumbsclassList, separatorView, breadcrumbsStartData,
} from '../../modules/data/breadCrumbsData';

export class BreadCrumbs {
  static instance = null;

  constructor() {
    if (!BreadCrumbs.instance) {
      BreadCrumbs.instance = this;
      this.element = document.createElement('div');
      this.element.className = breadCrumbsclassList.div;
      this.containerElement = addContainer(this.element);
    }

    return BreadCrumbs.instance;
  }

  render(list) {
    this.containerElement.textContent = '';
    const listElem = document.createElement('ul');
    listElem.className = breadCrumbsclassList.ul;

    const breadCrumbsList = [breadcrumbsStartData, ...list];

    const listItems = breadCrumbsList.map(item => {
      const listItemElem = document.createElement('li');
      listItemElem.className = breadCrumbsclassList.li;

      const linkElem = document.createElement('a');
      linkElem.className = breadCrumbsclassList.link;
      linkElem.textContent = item.text;
      if (item.href) {
        linkElem.href = item.href;
      }

      const separator = document.createElement('span');
      separator.className = breadCrumbsclassList.separator;
      separator.innerHTML = separatorView;

      listItemElem.append(linkElem, separator);

      return listItemElem;
    });

    listElem.append(...listItems);

    this.containerElement.append(listElem);
  }

  mount(parent, data) {
    this.render(data),
    parent.append(this.element);
    router.updatePageLinks();
  }

  unmount() {
    this.element.remove();
  }
}
