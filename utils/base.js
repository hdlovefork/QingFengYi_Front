
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

    let appid=wx.getExtConfigSync().appid;
    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: {
        'Content-Type': 'application/json',
        'Token': wx.getStorageSync('token'),
        'Cookie': 'XDEBUG_SESSION=PHPSTORM',
        'X-Api-Key': appid
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
          if(!noRefetch){
            switch(code){
              case '401':
              //重新获取令牌
                that._refetch(params);
              break;
              case '404':
              //重新请求数据
                that.request(params, true);               
              break;
            }
          }          
          if (noRefetch) {
            params.sCallback && params.sCallback(res.data);
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