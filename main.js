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
import {BreadCrumbs} from './features/BreadCrumbs/BreadCrumbs';

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

export const router = new Navigo('/', {linksSelector: 'a[href^="/"]'});

const init = () => {
  const api = new ApiService();

  new Header().mount();
  new Main().mount();
  new Footer().mount();

  producrSlider();

  router
      .on(
          '/',
          async () => {
            new Catalog().mount(new Main().element);
            const products = await api.getProducts();
            new ProductList().mount(new Main().element, products);
            router.updatePageLinks();
          },
          {
            leave(done) {
              new ProductList().unmount();
              new Catalog().unmount();
              done();
            },
            already(match) {
              match.route.handler(match);
            },
          },
      )
      .on(
          '/category',
          async ({params: {slug, page = 1}}) => {
            new Catalog().mount(new Main().element);
            const {data: products, pagination} = await api.getProducts({
              category: slug,
              page,
            });

            new BreadCrumbs().mount(new Main().element, [{text: slug}]);
            new ProductList().mount(new Main().element, products, slug);
            new Pagination()
                .mount(new ProductList().containerElement)
                .update(pagination);

            router.updatePageLinks();
          },
          {
            leave(done) {
              new Catalog().unmount();
              new ProductList().unmount();
              new BreadCrumbs().unmount();
              done();
            },
          },
      )
      .on(
          '/favorite',
          async ({params}) => {
            new Catalog().mount(new Main().element);
            const favorite = new FavoriteService().get();
            const {data: product, pagination} = await api.getProducts({
              list: favorite.join(','),
              page: params?.page || 1,
            });
            new BreadCrumbs().mount(new Main().element, [{text: 'Избранное'}]);
            new ProductList().mount(new Main().element, product, 'Избранное',
                'В избранном пока ничего нет');
            new Pagination()
                .mount(new ProductList().containerElement).update(pagination);
            router.updatePageLinks();
          },
          {
            leave(done) {
              new BreadCrumbs().unmount();
              new Catalog().unmount();
              new ProductList().unmount();
              done();
            },
            already(match) {
              match.route.handler(match);
            },
          },
      )
      .on(
          '/search',
          () => {
            console.log('search');
          },
      )
      .on(
          '/product/:id',
          (obj) => {
            console.log('obj: ', obj);
          },
      )
      .on(
          '/cart',
          () => {
            console.log('cart');
          },
      )
      .on(
          '/order',
          () => {
            new OrderInfo().mount(new Main().element);
          },
          {
            leave(done) {
              new OrderInfo().unmount();
              done();
            },
          },
      )
      .notFound(
          () => {
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
