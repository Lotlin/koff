/* eslint-disable require-jsdoc */
export class localStorage {
  async getItem(key) {
    localStorage.getItem(key);
  }

  async setItem(key, value) {
    localStorage.setItem(key, value);
  }

  async deleteItem(key) {
    localStorage.removeItem(key);
  }
}
