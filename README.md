# dxx

抖音开放平台 JavaScript SDK

抖小溪平台封装： www.mydouyin.com

目前只用到部分接口

## QuickStart

```bash
$ npm i
```

##　使用方法：
#### 引入类，实例化类，调用接口

```
const dxxopen_i = new dxxopen(
        { open_id: '',
          access_token: '' });

const res = await dxxopen_i.videoListGet();
```

## License

[MIT](https://github.com/epoberezkin/ajv/blob/master/LICENSE)