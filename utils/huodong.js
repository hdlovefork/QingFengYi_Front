import { Base } from 'base.js';

class HuoDong extends Base {
  get(nameAndPage, callback) {
    var params = {
      url: 'huodong/huodong/' + nameAndPage,
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }
}
export { HuoDong }