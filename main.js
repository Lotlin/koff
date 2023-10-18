/* eslint-disable new-cap */
import 'normalize.css';
import './style.scss';
import Navigo from 'navigo';
import {Header} from './modules/Header/Header';
import {Main} from './modules/Main/Main';
import {Footer} from './modules/Footer/Footer';
import {OrderInfo} from './modules/Main/OrderInfo';

const producrSlider = () => {
  Promise.all([
    import('swiper/modules'),
    import('swiper'),
    import('swiper/css'),
  ]).then(([{Navigation, Thumbs}, Swiper]) => {
    const swiperThumbnails = new Swiper.default('.product__slider-thumbnails', {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

    new Swiper.default('.product__slider-main', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.product__arrow--next',
        prevEl: '.product__arrow--prev',
      },
      modules: [Navigation, Thumbs],
      thumbs: {
        swiper: swiperThumbnails,
      },
    });
  });
};

const init = () => {
  new Header().mount();
  new Main().mount();
  new Footer().mount();

  producrSlider();

  const router = new Navigo('/', {linksSelector: 'a[href^="/"]'});

  router
      .on('/', () => {
        console.log('на главной');
      })
      .on('/category', (obj) => {
        console.log('category');
        console.log('obj: ', obj);
      })
      .on('/favorite', () => {
        console.log('favorite');
      })
      .on('/search', () => {
        console.log('search');
      })
      .on('/product/:id', (obj) => {
        console.log('obj: ', obj);
      })
      .on('/cart', () => {
        console.log('cart');
      })
      .on('/order', () => {
        new OrderInfo().mount();
      })
      .notFound(() => {
        document.body.innerHTML = `<h2>Страница не найдена</h2>`;
      });

  router.resolve();
};

init();
