import {Base} from '../../utils/base.js';

class Share extends Base{
  //淘宝详情描述信息
  getDetail(tbid,callback){
    var params={
      url:'https://hws.m.taobao.com/cache/wdetail/5.0/?id='+tbid,
      sCallback:function(res){
        callback && callback(res);
      }
    }
    this.request(params);
  }

  getQuanInfo(tbid,callback){
    let params = {
      url: 'quan/' + tbid,
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }
}

export {Share};