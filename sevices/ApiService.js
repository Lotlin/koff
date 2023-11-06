/* eslint-disable require-jsdoc */
import axios from 'axios';
import {API_URL} from '../const';
import {AccessKeyService} from '../sevices/StorageService';

export class ApiService {
  #apiUrl = API_URL;

  constructor() {
    this.accessKeyService = new AccessKeyService();
    this.accessKey = this.accessKeyService.get();
    console.log('this.accessKey: ', this.accessKey);
  }

  async getAccessKey() {
    try {
      if (!this.accessKey) {
        const response = await axios.get(`${this.#apiUrl}api/users/accessKey`);
        this.accessKey = response.data.accessKey;
        this.accessKeyService.set(this.accessKey);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getData(pathname, params = {}) {
    if (!this.accessKey) {
      await this.getAccessKey();
    }
    try {
      const url = new URL(this.#apiUrl);
      url.pathname = pathname;
      const response = await axios.get(`${this.#apiUrl}${pathname}`, {
        headers: {
          Authorization: `Bearer ${this.accessKey}`,
        },
        params,
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.accessKey = null;
        this.accessKeyService.delete();

        return this.getData(pathname, params);
      } else {
        console.log(error);
      }
    }
  }

  async getProducts(params) {
    return await this.getData('api/products', params);
  }

  async getProductCategories() {
    return await this.getData('api/productCategories');
  }

  async getProductById(id) {
    return await this.getData(`api/products/${id}`);
  }
}
