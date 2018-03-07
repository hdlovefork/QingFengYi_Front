import {Base} from '../../utils/base.js';

class Search extends Base{
  //热门搜索关键字
  getReSo(callback){
    let params={
      url:'reso',
      sCallback:callback
    }
    this.request(params);
  }
}

export {Search}