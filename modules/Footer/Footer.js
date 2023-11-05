/* eslint-disable require-jsdoc */
import {addContainer} from '../addContainer';
import {Logo} from '../../features/Logo/Logo';
import {
  footerClassList,
  designerSocialLink, disignerName, disignerTextContent, developerTextContent,
  developerSocialLink, developerName, supportYear,
} from '../data/footerData';
import {
  contactsClassList, contactsPhoneSVG, contactsVKSVG,
  contactsYouTubeSVG, contactsTelegramSVG,
} from '../data/contactsData';
import {
  companyName, companyContactsLinks, comnpanyPhoneNumber,
} from '../data/companyData';

export class Footer {
  static instance = null;

  constructor() {
    if (!Footer.instance) {
      Footer.instance = this;

      this.element = document.createElement('footer');
      this.element.classList.add(`${footerClassList.footer}`);
      this.containerElement = addContainer(this.element,
          `${footerClassList.container}`);
      this.isMounted = false;
    }

    return Footer.instance;
  }

  getCompanyContacts() {
    const companyContacts = document.createElement('div');
    companyContacts.classList =
      `${footerClassList.contacts} ${contactsClassList.companyContacts}`;

    const phone = document.createElement('a');
    phone.className = `${contactsClassList.phone}`;
    phone.href = `${companyContactsLinks.tel}`;
    phone.insertAdjacentHTML('beforeend', `${contactsPhoneSVG}`);

    const phoneSpan = document.createElement('span');
    phoneSpan.textContent = `${comnpanyPhoneNumber}`;

    phone.append(phoneSpan);

    const contactList = document.createElement('ul');
    contactList.className = `${contactsClassList.ul}`;

    const vk = document.createElement('li');
    vk.classList = `${contactsClassList.li}`;

    const socialLinkVK = document.createElement('a');
    socialLinkVK.className = `${contactsClassList.socialLink}`;
    socialLinkVK.href = `${companyContactsLinks.vk}`;
    socialLinkVK.insertAdjacentHTML('beforeend', `${contactsVKSVG}`);

    vk.append(socialLinkVK);

    const youTube = document.createElement('li');
    youTube.classList = `${contactsClassList.li}`;

    const socialLinkYouTube = document.createElement('a');
    socialLinkYouTube.className = `${contactsClassList.socialLink}`;
    socialLinkYouTube.href = `${companyContactsLinks.youTube}`;
    socialLinkYouTube.insertAdjacentHTML('beforeend', `${contactsYouTubeSVG}`);

    youTube.append(socialLinkYouTube);

    const telegram = document.createElement('li');
    telegram.classList = `${contactsClassList.li}`;

    const socialLinkTelegram = document.createElement('a');
    socialLinkTelegram.className = `${contactsClassList.socialLink}`;
    socialLinkTelegram.href = `${companyContactsLinks.telegram}`;
    socialLinkTelegram.insertAdjacentHTML('beforeend',
        `${contactsTelegramSVG}`);

    telegram.append(socialLinkTelegram);


    contactList.append(vk, youTube, telegram);


    companyContacts.append(phone);
    companyContacts.append(contactList);

    return companyContacts;
  }

  getDeveloperList() {
    const developerList = document.createElement('ul');
    developerList.className = `${footerClassList.developerList}`;

    const designer = document.createElement('li');
    designer.className = `${footerClassList.developerItem}`;
    const designerSpan = document.createElement('span');
    designerSpan.textContent = `${disignerTextContent}`;
    const designerLink = document.createElement('a');
    designerLink.className = `${footerClassList.developerItemLink}`;
    designerLink.href = `${designerSocialLink}`;
    designerLink.target = 'target="_blank"';
    designerLink.textContent = `${disignerName}`;
    designer.append(designerSpan, designerLink);

    const developer = document.createElement('li');
    developer.className = `${footerClassList.developerItem}`;
    const developerSpan = document.createElement('span');
    developerSpan.textContent = `${developerTextContent}`;
    const developerLink = document.createElement('a');
    developerLink.className = `${footerClassList.developerItemLink}`;
    developerLink.href = `${developerSocialLink}`;
    developerLink.target = 'target="_blank"';
    developerLink.textContent = ` ${developerName}`;
    developer.append(developerSpan, developerLink);

    developerList.append(designer, developer);

    return developerList;
  }

  getCopyright() {
    const copyright = document.createElement('p');
    copyright.className = `${footerClassList.copyright}`;
    copyright.innerHTML = `&#169; ${companyName}, ${supportYear}`;

    return copyright;
  }

  mount() {
    if (this.isMounted) {
      return;
    }

    const logo = new Logo('footer').create();
    const contacts = this.getCompanyContacts();
    const developerList = this.getDeveloperList();
    const copyright = this.getCopyright();

    this.containerElement.append(logo, contacts, developerList, copyright);

    document.body.append(this.element);

    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
}
