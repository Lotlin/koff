/* eslint-disable new-cap */
import 'normalize.css';
import './style.scss';
import Navigo from 'navigo';
import {Header} from './modules/Header/Header';
import {Main} from './modules/Main/Main';
import {Footer} from './modules/Footer/Footer';
import {OrderInfo} from './modules/OrderInfo/OrderInfo';
import {ProductList} from './modules/ProdictList/ProductList';
import {ApiService} from './sevices/ApiService';
import {Catalog} from './modules/Catalog/Catalog';
import {NotFound} from './modules/NotFound/NotFound';
import {FavoriteService} from './sevices/StorageService';
import {Pagination} from './features/Pagination/Pagination';

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
  const api = new ApiService();
  const router = new Navigo('/', {linksSelector: 'a[href^="/"]'});

  new Header().mount();
  new Main().mount();
  new Footer().mount();

  api.getProductCategories().then(data => {
    new Catalog().mount(new Main().element, data);
    router.updatePageLinks();
  });

  producrSlider();

  router
      .on('/', async () => {
        const products = await api.getProducts();
        new ProductList().mount(new Main().element, products);
        router.updatePageLinks();
      },
      {
        leave(done) {
          new ProductList().unmount();
          done();
        },
        already(match) {
          match.route.handler(match);
        },
      },
      )
      .on(
          '/category',
          async ({params: {slug, page}}) => {
            const {data: products, pagination} = await api.getProducts({
              category: slug,
              page: page || 1,
            });

            new ProductList().mount(new Main().element, products, slug);
            new Pagination()
                .mount(new ProductList().containerElement)
                .update(pagination);

            router.updatePageLinks();
          },
          {
            leave(done) {
              new ProductList().unmount();
              done();
            },
          },
      )
      .on('/favorite', async () => {
        const favorite = new FavoriteService().get();
        const {data: product} =
            await api.getProducts({list: favorite.join(',')});
        new ProductList().mount(new Main().element, product, 'Избранное',
            'В избранном пока ничего нет');
        router.updatePageLinks();
      },
      {
        leave(done) {
          new ProductList().unmount();
          done();
        },
        already(match) {
          match.route.handler(match);
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
        new OrderInfo().mount(new Main().element);
      },
      {
        leave(done) {
          new OrderInfo().unmount();
          done();
        },
      },
      )
      .notFound(() => {
        new NotFound().mount(new Main().element);
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
