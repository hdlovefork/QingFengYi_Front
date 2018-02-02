import {Base} from '../../../../utils/base.js';

class Index extends Base{
  getGoods(data,callback){
    let params={
      url:'dabaicai_goods/page/'+data.page+'/cid/'+data.cid,
      sCallback:function(res){
        callback && callback(res);
      }
    };
    this.request(params);
  }
}

export {Index}