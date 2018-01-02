
import { Token } from 'utils/token.js';

App({
  onLaunch: function () {
    var token = new Token();
    token.verify();
  },
  baseUrl:'//wx.cn/'
});