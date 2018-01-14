import {Base} from '../../utils/base.js';

class Rate extends Base{
  getRate(data,callback){
    let params={
      url: 'rate',
      data: data,
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params,false);
  }
}

module.exports = {Rate}