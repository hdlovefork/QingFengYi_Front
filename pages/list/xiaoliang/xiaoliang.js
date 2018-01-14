// pages/list/xiaoliang.js
import { HuoDong } from '../../../utils/huodong.js';

var huodong = new HuoDong();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    curPage: 0,
    isLoading: false,
    huodong: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.huodong = options.get;
    let title = options.title || Config.appName;
    //设置导航标题
    wx.setNavigationBarTitle({
      title: title,
    })
    this._init();
  },

  _init: function () {
    this.onLoadMore();
  },

  _loadData: function () {
    huodong.get(this.data.huodong + '/page/' + this.data.curPage, (res) => {
      this.setData({
        goods: this.data.goods.concat(res.goods),
        curPage: this.data.curPage,
        isLoading: false
      });
    });
  },

  onLoadMore: function () {
    if (this.data.isLoading) return;
    this.data.isLoading = true;
    this.setData({ isLoading: true });
    this.data.curPage++;
    this._loadData();
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.onLoadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})