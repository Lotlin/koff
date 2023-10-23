/* eslint-disable new-cap */
import 'normalize.css';
import './style.scss';
import Navigo from 'navigo';
import {Header} from './modules/Header/Header';
import {Main} from './modules/Main/Main';
import {Footer} from './modules/Footer/Footer';
import {OrderInfo} from './modules/Main/OrderInfo';
import {ProductList} from './modules/ProdictList/ProductList';

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
        new ProductList().mount(new Main().element, [1]);
      },
      {
        leave(done) {
          console.log('leave');
          done();
        },
        already() {
          console.log('already');
        },
      },
      )
      .on('/category', () => {
        // eslint-disable-next-line max-len
        new ProductList().mount(new Main().element, [1, 2, 3, 4, 5, 6], 'Категория');
      },
      {
        leave(done) {
          console.log('leave');
          done();
        },
      },
      )
      .on('/favorite', () => {
        new ProductList().mount(new Main().element, [1, 2, 3], 'Избранное');
      },
      {
        leave(done) {
          console.log('leave');
          done();
        },
      },
      )
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
        new Main().element.innerHTML = `
          <h2>Страница не найдена</h2>
          <p>Через 5 секунд вы будете перенаправлены
            <a href="/">на главную страницу</a>
          </p>`;

        setTimeout(() => {
          router.navigate('/');
        }, 5000);
      },
      {
        leave(done) {
          new Main().element.innerHTML = '';
          done();
        },
      },
      );

  router.resolve();
};

init();
