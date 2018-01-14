import {Base} from '../../utils/base.js';

class Category extends Base{
  getAll(callback){
    let params={
      url:'category',
      sCallback:function(res){
        callback && callback(res);
      }
    }
    this.request(params);
  }
}

export {Category}