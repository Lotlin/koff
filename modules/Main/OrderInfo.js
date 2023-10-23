/* eslint-disable require-jsdoc */
import {addContainer} from '../addContainer';
import {
  orderInfoClassList, titleTextContent, deliveryTitleTextContent,
  homeLinkHref, homeLinkTextContent,
} from '../data/orderInfoData';
import {
  tableClassList, tableTextContent,
} from '../data/tableData';
import {getMainSection} from '../getElements';
import {renderTableRow} from '../renderTableRow';
import {currency} from '../data/data';

export class OrderInfo {
  static instance = null;
  constructor() {
    if (!OrderInfo.instance) {
      OrderInfo.instance = this;

      this.element = document.createElement('section');
      this.element.className = `${orderInfoClassList.section}`;
      this.containerElement =
      addContainer(this.element, `${orderInfoClassList.container}`);

      this.isMounted = false;
    }

    return OrderInfo.instance;
  }

  getTitleWrapper() {
    const wrapper = document.createElement('div');
    wrapper.className = `${orderInfoClassList.titleWrapper}`;

    const title = document.createElement('h2');
    title.className = `${orderInfoClassList.title}`;
    title.textContent = `${titleTextContent}`;

    const price = document.createElement('p');
    price.className = `${orderInfoClassList.price}`;
    price.textContent = `0 ${currency}`;

    const orderNum = document.createElement('p');
    orderNum.className = `${orderInfoClassList.orderNum}`;
    orderNum.textContent = `№`;

    wrapper.append(title, price, orderNum);

    this.priceElement = price;
    this.orderNumElement = orderNum;

    return wrapper;
  }

  getDeliveryTitle() {
    const deliveryTitle = document.createElement('h3');
    deliveryTitle.className = `${orderInfoClassList.deliveryTitle}`;
    deliveryTitle.textContent = `${deliveryTitleTextContent}`;

    return deliveryTitle;
  }

  getTable() {
    const table = document.createElement('table');
    table.className = `${orderInfoClassList.table} ${tableClassList.table}`;
    const recipientRow = renderTableRow(tableTextContent.recipient);
    const phoneRow = renderTableRow(tableTextContent.phone);
    const emailRow = renderTableRow(tableTextContent.email);
    const address = renderTableRow(tableTextContent.address);
    const paymentMethod = renderTableRow(tableTextContent.paymentMethod);
    const deliveryMethod = renderTableRow(tableTextContent.deliveryMethod);

    table.append(
        recipientRow, phoneRow, emailRow,
        address, paymentMethod, deliveryMethod,
    );

    this.table = table;

    return table;
  }

  getHomeLink() {
    const link = document.createElement('a');
    link.className = `${orderInfoClassList.homeLink}`;
    link.href = `${homeLinkHref}`;
    link.textContent = `${homeLinkTextContent}`;

    return link;
  }


  changePrice(n) {
    // todo get n
    this.priceElement.textContent = `${n} ${currency}`;
  }

  changeOrderNum(n) {
    // todo get n
    this.orderNumElement.textContent = `№${n}`;
  }

  fillDeliberyData(user) {
    // todo get user and fill data
    // eslint-disable-next-line max-len
    // const allValuesTd = this.table.querySelectorAll(`.${tableClassList.value}`);
  }


  mount() {
    if (this.isMounted) {
      return;
    }

    const titleWrapper = this.getTitleWrapper();
    const deliveryTitle = this.getDeliveryTitle();
    const table = this.getTable();
    const homeLink = this.getHomeLink();

    this.containerElement.append(titleWrapper, deliveryTitle, table, homeLink);

    const mainSection = getMainSection();
    mainSection.append(this.element);

    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
}
