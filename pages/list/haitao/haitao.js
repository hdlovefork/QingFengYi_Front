// pages/list/haitao/haitao.js
import { HuoDong } from '../../../utils/huodong.js';
import { Base } from '../../../utils/base.js';
import { Config } from '../../../utils/config.js';

var huodong = new HuoDong();
var base = new Base();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    isLoading: false,
    curPage: 0,
    //分类类型：综合（zh)，最新(zx)，销量(sell)，价格(jgup)，默认综合(zh)
    category: ['zh', 'zx', 'sell', 'jgup'],
    //默认显示综合
    categoryIndex: 0,
    baseUrl:Config.baseUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.huodong = 'haitao';
    let title = options.title || Config.appName;
    //设置导航标题
    wx.setNavigationBarTitle({
      title: title,
    })
    this.onLoadMore();
  },

  _loadData: function (overrideGoods) {
    let px = this.data.category[this.data.categoryIndex];
    //calculate/page/1/px/zh
    huodong.get(this.data.huodong + '/page/' + this.data.curPage + '/px/' + px, (res) => {
      this.setData({
        goods: this.data.goods.concat(res.goods),
        curPage: this.data.curPage,
        isLoading: false
      });
    });
  },

  //切换选项分类
  onChangeTab: function (event) {
    let index = base.getDataSet(event, 'idx');
    //切换目录
    this.setData({
      categoryIndex: index,
      curPage: 0,
      goods: []
    }, function () {
      this.onLoadMore();
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})