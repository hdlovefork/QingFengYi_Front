import { Rate } from 'rate-model.js';
import {Config} from '../../utils/config.js';

var rate = new Rate();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    tbid: 0,
    lastPage: 2,
    pics: [],
    rates: [],
    loading: false,
    baseUrl: Config.baseUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tbid: options.tbid
    })
    this._init();
  },

  _init() {
    let data = {
      tbid: this.data.tbid,
      page: 1
    }
    this._getRate(data);
  },

  _getRate(data) {
    if (this.data.loading) return;
    this.setData({
      loading: true
    });
    rate.getRate(data, (res) => {
      //将图片追加到this.data.pics中，索引从0开始
      let picTemp = this.data.pics;
      let ratesTemp = this.data.rates;
      if (res && res.rateList) {
        res.rateList.forEach((value, index, array) => {
          //追加保存评论列表
          ratesTemp.push(value);
          //追加保存图片列表
          if (value.pics) {
            picTemp.push(value.pics);
          } else {
            picTemp.push([]);
          }
        });
      }
      this.setData({
        rates: ratesTemp,
        page: res.paginator.page,
        lastPage: res.paginator.lastPage,
        pics: picTemp,
        loading: false
      })
    })
  },

  onShowImage(event){
    let id = rate.getDataSet(event,'id');
    let picsTemp = this.data.pics[id];
    rate.addProtocol(picsTemp);
    wx.previewImage({
      urls: picsTemp
    });
  },

//返回去购买
onBack(event){
  console.log('back');
  wx.navigateBack();
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  onBindscrolltolower: function () {
    if (this.data.page < this.data.lastPage) {
      let data = {
        tbid: this.data.tbid,
        page: this.data.page + 1
      }
      this._getRate(data);
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})