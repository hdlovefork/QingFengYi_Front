// pages/share/share.js
import {Share} from "share-model.js";
import {Config} from "../../utils/config.js";

var share = new Share();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tbid:0,
    dtkid:0,
    from:'',
    istmall:false,
    pics:[],
    title:'',
    shopName:'',
    datasource:null,
    baseUrl:Config.baseUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.tbid = options.i;
    this.data.dtkid = options.ti;
    this.data.from = options.x;
    this._init(this.data.tbid);
  },

  _init(tbid){
    share.getDetail(tbid,(res)=>{
      this.setData({
        datasource:res,
        title: res.data.itemInfoModel.title,
        pics: res.data.itemInfoModel.picsPath,
        isTmall: /tmall.com/.test(res.data.itemInfoModel.itemUrl) ? true:false,
        shopIcon:res.data.seller.picUrl,
        shopName:res.data.seller.shopTitle,
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