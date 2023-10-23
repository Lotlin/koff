import {addContainer} from '../addContainer';
import {
  notFoundClassList, titleTextContent, tetxtTextContent,
  linkTextContent, linkHref,
} from '../data/notFoundData';

/* eslint-disable require-jsdoc */
export class NotFound {
  static instance = null;

  constructor() {
    if (!NotFound.instance) {
      NotFound.instance = this;

      this.element = document.createElement('section');
      this.element.className = notFoundClassList.section;
      this.containerElement = addContainer(this.element);
      this.isMounted = false;
    }

    return NotFound.instance;
  }

  mount(parent) {
    if (this.isMounted) {
      return;
    }

    const title = document.createElement('h2');
    title.className = notFoundClassList.title;
    title.textContent = titleTextContent;
    const text = document.createElement('p');
    text.className = notFoundClassList.text;
    text.textContent = tetxtTextContent;
    const link = document.createElement('a');
    link.className = notFoundClassList.link;
    link.textContent = linkTextContent;
    link.href = linkHref;
    text.append(link);

    this.containerElement.append(title, text);

    parent.append(this.element);

    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
}
