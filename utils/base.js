
import { Config } from 'config.js';
import { Token } from 'token.js';

class Base {
  constructor() {
    this.baseRequestUrl = Config.restUrl;
  }

  // 当noRefech为true时，不做未授权重试机制
  request(params, noRefetch) {
    var that = this;
    var url = /^(http|https)/.test(params.url) ? params.url : this.baseRequestUrl + params.url;

    if (!params.type) {
      params.type = 'GET';
    }

    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: {
        'Content-Type': 'application/json',
        'Token': wx.getStorageSync('token'),
        'Cookie': 'XDEBUG_SESSION=PHPSTORM',
        'X-Api-Key': 'e101831fa8c8f819a3f1a4d2d7100e2b'
      },
      success: function (res) {
        // if(params.sCallBack){
        //   params.sCallBack(res);
        // }

        var code = res.statusCode.toString();
        var startChar = code.charAt(0);

        if (startChar == '2') {
          params.sCallback && params.sCallback(res.data);
        }
        else {
          //AOP
          if (code == '401') {
            // token.getTokenFromServer
            // base.request
            if (!noRefetch) {
              that._refetch(params);
            }
          }
          if (noRefetch) {
            params.eCallback && params.eCallback(res.data);
          } else {
            that.request(params, true);
          }
        }
      },
      fail: function (err) {
        console.log(err);
      }
    })
  }


  _refetch(params) {
    var token = new Token();
    token.getTokenFromServer((token) => {
      this.request(params, true);
    });
  }

  /*获得元素上的绑定的值*/
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  }

  addProtocol(images, protocol = 'https:') {
    if(!Array.isArray(images)) return;
    for (let i = 0; i < images.length; i++) {
      let image = images[i];
      if (/^(http:|https:)/.test(image)) continue;
      images[i] = protocol + image;
    }
  }

}

export { Base };