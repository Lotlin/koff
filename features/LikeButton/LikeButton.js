/* eslint-disable require-jsdoc */
import {FavoriteService} from '../../sevices/StorageService';
import {likeSvg} from '../likeSVG/likeSvg';


export class LikeButton {
  constructor(className) {
    this.className = className;
    this.favoriteService = new FavoriteService();
  }

  create(id) {
    const likeButton = document.createElement('button');
    likeButton.className = this.className;
    likeButton.type = 'button';
    likeSvg().then((svg) => {
      likeButton.append(svg);
    });
    likeButton.dataset.id = id;

    if (this.favoriteService.check(id)) {
      likeButton.classList.add(`${this.className}--active`);
    }

    likeButton.addEventListener('click', () => {
      if (this.favoriteService.check(id)) {
        likeButton.classList.remove(`${this.className}--active`);
        this.favoriteService.remove(id);
      } else {
        this.favoriteService.add(id);
        likeButton.classList.add(`${this.className}--active`);
      }
    });

    return likeButton;
  }
}
