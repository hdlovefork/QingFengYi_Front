import { Base } from '../../utils/base.js';

class Share extends Base {
  //淘宝详情描述信息
  getDetail(ids, callback) {
    var params = {
      url: 'https://hws.m.taobao.com/cache/wdetail/5.0/?id=' + ids.tbid,
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }
  getTKL(data,callback){
    let params={
      url:'tkl',
      type:'POST',
      data:data,
      sCallback:function(res){
        callback && callback(res);
      }
    }
    this.request(params);
  }
  getQuanInfo(ids, callback) {
    let params = {
      url: 'quan',     
      data:ids,
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  getDetailPics(ids, callback) {
    let params = {
      url: 'pics',
      data:ids,
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }
}

export { Share };