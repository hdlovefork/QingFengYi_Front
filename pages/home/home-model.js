import {Base} from '../../utils/base.js';


class Home extends Base{
  constructor(){
    super();
  }
  getBanners(callback){
    var params={
      url:'banners',
      sCallback:function(res){
        callback && callback(res);
      }
    }
    this.request(params,false);
  }
  
  getTopics(callback){
    var params = {
      url: 'topics',
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params, false);
  }

  getHomeicons(callback){
    var params = {
      url: 'homeicons',
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params, false);
  }
}

export {Home};