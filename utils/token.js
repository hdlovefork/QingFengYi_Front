import { Config } from 'config.js';

class Token {
  constructor(){
    this.verifyUrl = Config.restUrl + 'token_verify';
    this.tokenUrl = Config.restUrl + 'token_user';
    this.appKey = Config.appKey;
  }

  verify(callback) {
    var token = wx.getStorageSync('token');
    if (!token) {
      this.getTokenFromServer(callback);
    }
    else {
      this._veirfyFromServer(token,callback);
    } 
  }

 // 携带令牌去服务器校验令牌
  _veirfyFromServer(token,callback) {
    var that = this;
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      header: {
        'cookie': 'XDEBUG_SESSION=PHPSTORM',
        'X-Api-Key':that.appKey
      },
      data: {
        token: token
      },
      success: function (res) {
        var valid = res.data.is_valid;
        if (!valid) {
          that.getTokenFromServer(callback);
        }else{
          callback && callback(token);
        }
      }
    })
  }

  //从服务器获取token
  getTokenFromServer(callBack) {   
    //防止同一时间多次获取token
    // let started = wx.getStorageSync('getting_token');
    // if(started) return;
    // wx.setStorageSync('getting_token',true);
    var that = this;
    wx.login({
      success: function (res) {
        console.log(res.code);
        wx.request({
          url: that.tokenUrl,
          method: 'POST',
          header: {
            'cookie': 'XDEBUG_SESSION=PHPSTORM',
            'X-Api-Key': that.appKey
          },
          data: {
            code: res.code
          },
          success: function (res) {
            wx.setStorageSync('token', res.data.token);
            // wx.setStorageSync('getting_token',false);
            callBack && callBack(res.data.token);
          }
        })
      }
    })
  }
}

export {Token};