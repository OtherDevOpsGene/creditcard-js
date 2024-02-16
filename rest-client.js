"use strict";

export class RestClient {
  constructor(url) {
    this.url = url;
  }

  // Dummy method stub
  async get(id) {
    return new Promise({status: 501}, null);
  }

  // Dummy method stub
  async put(obj) {
    return {status: 501};
  }

  // Dummy method stub
  async post(obj) {
    return {status: 501};
  }

  // Dummy method stub
  async delete(id) {
    return {status: 501};
  }
}
