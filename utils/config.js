
class Config {
  constructor() {

  }
}

Config.appKey = wx.getExtConfigSync().appid;

Config.restUrl = 'https://wx.tztfanli.com/api/';
Config.baseUrl = "https://wx.tztfanli.com/";

// Config.restUrl = 'http://wx.cn/api/';
// Config.baseUrl = "http://wx.cn/";

Config.appName='清风易淘客';

export { Config };