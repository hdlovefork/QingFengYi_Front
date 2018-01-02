import {Base} from '../../utils/base.js';

class Home extends Base{
  constructor(){
    super();
  }
  getBanners(callback){
    var params={
      url:'home',
      sCallback:function(res){
        callback && callback(res);
      }
    }
    this.request(params);
  }
}

export {Home};