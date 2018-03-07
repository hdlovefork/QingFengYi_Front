import {Base} from '../../utils/base.js';

class Topic extends Base{
  getTopic(keyword,callback){
    let params = {
      url:'topic',
      data:{'id':keyword},
      sCallback:callback
    };
    this.request(params);
  }
}

export {Topic}