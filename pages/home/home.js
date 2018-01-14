// pages/home.js
import {Home} from 'home-model.js';
import {Config} from '../../utils/config.js';
import {HuoDong} from '../../utils/huodong.js';

import { Token } from '../../utils/token.js';

var huodong = new HuoDong();
var home = new Home();
var token=new Token();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:{},
    homeicons:{},
    topics:{},
    newQiang:{},
    goods:[],
    baseUrl:Config.baseUrl,
    curPage:0,
    isLoading:false
  },
  loadingChange:function(){
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
    token.verify((token)=>{
      this._getBanners();
      this._getHomeicons();
      this._getTopics();
      this._getHuodong();
      this._getGoods();
    });
  },
//咚咚抢
  _getHuodong(){
    huodong.get('newqiang',(res)=>{
      this.setData({
        newQiang:res
      })
    })    
  },

  _getBanners:function(){
    home.getBanners((res)=>{
      this.setData({
          'banners':res
      });
    });
  },

  _getHomeicons:function(){
    home.getHomeicons((res) => {
      this.setData({
        'homeicons': res
      });
    });
  },

  _getTopics:function(){
    home.getTopics((res) => {
      this.setData({
        'topics': res
      });
    });
  },

  _getGoods:function(){
    
  },

  onLoadMore:function(event){
    if(this.data.isLoading) return;
    //防止重入，多次调用事件只执行一次
    this.data.isLoading=true;
    //显示加载中图片
    this.setData({isLoading:true});
    this.data.curPage++;
    huodong.get('home/page/'+this.data.curPage, (res) => {
      this.setData({
        goods: this.data.goods.concat(res.goods),
        curPage:this.data.curPage,
        isLoading:false
      })
    })
  },

  onShareTap:function(event){
    let path = home.getDataSet(event,'path');
    wx.navigateTo({
      url:  path
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