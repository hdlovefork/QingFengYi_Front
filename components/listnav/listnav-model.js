import {Base} from '../../utils/base.js';

class ListNav extends Base{
  get(callback){
    let params={
      url:'dabaicai_list_nav',
      sCallback:function(res){
        callback && callback(res);
      }
    };
    this.request(params);
  }
}

export { ListNav}