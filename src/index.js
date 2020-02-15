'use strict';

const axios = require('axios');
const validator = require('validator');

class douyinOpen {
  constructor(options = {}) {
    this.douyinAXIOS = axios.create({
      baseURL: 'https://open.douyin.com',
      timeout: 5000,
    });
    const { open_id, access_token } = options;
    if (typeof open_id === 'undefined') {
      this.open_id = '';
    } else {
      this.open_id = open_id;
    }
    if (typeof access_token === 'undefined') {
      this.access_token = '';
    } else {
      this.access_token = access_token;
    }

    this.root = {};
    this.root.videoListGet = '/video/list/';
    this.root.videoDataPost = '/video/data/';
    this.root.fansDataGet = '/fans/data/';
    this.root.fansListGet = '/fans/list/';
    this.root.followingListGet = '/following/list/';
    this.root.oauthUserinfoGet = '/oauth/userinfo/';

  }

  async checkOpenIdAndAccessToken(options = {}) {

    const { open_id, access_token } = options;

    if (!(typeof open_id === 'undefined')) {
      this.open_id = open_id;
    }

    if (!(typeof access_token === 'undefined')) {
      this.access_token = access_token;
    }

    if (validator.isEmpty(this.open_id)) {
      throw new Error('open_id is empty');
    }

    if (validator.isEmpty(this.access_token)) {
      throw new Error('access_token is empty');
    }
  }

  async oauthUserinfoGet(options = {}) {
    this.checkOpenIdAndAccessToken(options);

    try {
      const res = await this.douyinAXIOS.get(
        this.root.oauthUserinfoGet, {
          method: 'get', // default
          headers: { Accept: 'application/json' },
          params: {
            open_id: this.open_id,
            access_token: this.access_token,
          },
        }
      );
      if (res.status !== 200) {
        throw new Error('Http status err');
      }
      return res.data;
    } catch (error) {
      throw new Error('fansListGet ' + error.toString());
    }
  }

  async fansListGet(options = {}) {
    this.checkOpenIdAndAccessToken(options);

    const count = options.count || 20;
    const cursor = options.cursor || 0;


    try {
      const res = await this.douyinAXIOS.get(
        this.root.fansListGet, {
          method: 'get', // default
          headers: { Accept: 'application/json' },
          params: {
            open_id: this.open_id,
            access_token: this.access_token,
            count,
            cursor,
          },
        }
      );
      if (res.status !== 200) {
        throw new Error('Http status err');
      }
      return res.data;
    } catch (error) {
      throw new Error('fansListGet ' + error.toString());
    }
  }

  async followingListGet(options = {}) {
    this.checkOpenIdAndAccessToken(options);

    const count = options.count || 20;
    const cursor = options.cursor || 0;

    try {
      const res = await this.douyinAXIOS.get(
        this.root.followingListGet, {
          method: 'get', // default
          headers: { Accept: 'application/json' },
          params: {
            open_id: this.open_id,
            access_token: this.access_token,
            count,
            cursor,
          },
        }
      );
      if (res.status !== 200) {
        throw new Error('Http status err');
      }
      return res.data;
    } catch (error) {
      throw new Error('followingListGet ' + error.toString());
    }

  }


  async fansDataGet(options = {}) {
    this.checkOpenIdAndAccessToken(options);

    try {
      const res = await this.douyinAXIOS.get(
        this.root.fansDataGet, {
          method: 'get', // default
          headers: { Accept: 'application/json' },
          params: {
            open_id: this.open_id,
            access_token: this.access_token,
          },
        }
      );
      if (res.status !== 200) {
        throw new Error('Http status err');
      }
      return res.data;
    } catch (error) {
      throw new Error('fansDataGet ' + error.toString());
    }

  }

  async videoDataPost(options = {}) {
    this.checkOpenIdAndAccessToken(options);

    // 这是一个由视频itemid组成的字符串数组类型
    const item_ids = options.item_ids;

    if (!(item_ids instanceof Array)) {
      throw new Error('videoDataPost item_ids not Array');
    }

    if (item_ids.length === 0) {
      throw new Error('videoDataPost item_ids length is 0');
    }

    for (let i = 0; i < item_ids.length; i++) {
      if (typeof item_ids[i] !== 'string') {
        throw new Error('videoDataPost item_ids items is not str');
      }
    }
    // 参数检测完毕
    try {
      const res = await this.douyinAXIOS.get(
        this.root.videoDataPost, {
          method: 'post', // default
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          params: {
            open_id: this.open_id,
            access_token: this.access_token,
          },
          data: {
            item_ids,
          },
        }
      );
      if (res.status !== 200) {
        throw new Error('Http status err');
      }
      return res.data;

    } catch (error) {
      throw new Error('videoDataPost ' + error.toString());
    }
  }

  async videoListGet(options = {}) {
    //   这个接口网络正常会返回抖音的请求数据
    this.checkOpenIdAndAccessToken(options);
    const count = options.count || 20;
    const cursor = options.cursor || 0;

    try {
      const res = await this.douyinAXIOS.get(
        this.root.videoListGet, {
          method: 'get', // default
          headers: { Accept: 'application/json' },
          params: {
            open_id: this.open_id,
            access_token: this.access_token,
            count,
            cursor,
          },
        }
      );
      if (res.status !== 200) {
        throw new Error('Http status err');
      }
      return res.data;
    } catch (error) {
      throw new Error('videoListGet ' + error.toString());
    }
  }

  async test() {
    const res = await this.oauthUserinfoGet({
      open_id: '749501f6-af7a-4a81-abe9-aef2a38b4795',
      access_token: 'act.97116021121cecc6ba6c72707aa79ddbIzeSAT8mi5LdD8h0DIWbyL4piBTA',
      item_ids: [ '@9VwHg6OUDcRjN2LzdNw1Qc7802ztOvGLPJVwrQyvJ1YWavT160zdRmYqig357zEBMJI/429f1m2/WmxYRZWjsg==' ],
    });
    console.log(res);
  }
}


module.exports = douyinOpen;
