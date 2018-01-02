import {Base} from '../../utils/base.js';

class Share extends Base{
  getDetail(tbid,callback){
    var params={
      url:'https://hws.m.taobao.com/cache/wdetail/5.0/?id='+tbid,
      sCallback:function(res){
        callback && callback(res);
      }
    }
    this.request(params);
  }
}

export {Share};