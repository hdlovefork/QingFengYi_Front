import { Config } from 'config.js';

class Token {
  constructor(){
    this.verifyUrl = Config.restUrl + 'token_verify';
    this.tokenUrl = Config.restUrl + 'token_user';
    this.appKey = Config.appKey;
  }

  verify() {
    var token = wx.getStorageSync('token');
    if (!token) {
      this.getTokenFromServer();
    }
    else {
      this._veirfyFromServer(token);
    } 
  }

 // 携带令牌去服务器校验令牌
  _veirfyFromServer(token) {
    var that = this;
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      header: {
        'cookie': 'XDEBUG_SESSION=PHPSTORM',
        'X-API-KEY':that.appKey
      },
      data: {
        token: token
      },
      success: function (res) {
        var valid = res.data.is_valid;
        if (!valid) {
          that.getTokenFromServer();
        }
      }
    })
  }

  //从服务器获取token
  getTokenFromServer(callBack) {
    var that = this;
    wx.login({
      success: function (res) {
        console.log(res.code);
        wx.request({
          url: that.tokenUrl,
          method: 'POST',
          header: {
            'cookie': 'XDEBUG_SESSION=PHPSTORM',
            'X-API-KEY': that.appKey
          },
          data: {
            code: res.code
          },
          success: function (res) {
            wx.setStorageSync('token', res.data.token);
            callBack && callBack(res.data.token);
          }
        })
      }
    })
  }
}

export {Token};