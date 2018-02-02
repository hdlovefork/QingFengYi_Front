// pages/baicai/list/index/index.js
import { Index } from 'index-model.js';
var index = new Index();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    lastPage: 1,
    curPage: 0,
    isLoading: false,
    curCid: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onCateSwitch: function (event) {
    let cid = event.detail.cid;
    this.setData({
      curCid: cid,
      goods: [],
      curPage:0,
      lastPage:1,
    })
    this.onLoadMore();
    // index.getGoods({ cid: cid, page: 1 }, (res) => {
    //   this.setData({
    //     ds: res,
    //     lastPage: res.lastPage,
    //     curPage: res.page,
    //     curCid: cid
    //   })
    // })
  },

  onLoadMore: function () {
    if (this.data.isLoading && this.data.curPage >= this.data.lastPage) return;
    this.setData({
      isLoading: true
    })
    this.data.curPage++;
    index.getGoods({
      cid: this.data.curCid,
      page: this.data.curPage
    }, (res) => {
      this.setData({
        goods: this.data.goods.concat(res.goods),
        lastPage: res.lastPage,
        curPage: res.page,
        curCid: res.cid,
        isLoading: false
      })
    })
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