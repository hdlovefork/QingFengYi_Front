// pages/search/search.js
import { Search } from 'search-model.js';
var search = new Search();

//每次显示的热搜关键字个数
var pageSize = 20;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    reso: [],
    resoPages: 0,
    resoPage: 0,
    curTab: 'gaoeso',
    recentSo:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._init();
  },


  _init() {
    search.getReSo((res) => {
      if (!res || !res.data || !res.data.length) return;
      this.data.reso = res.data;
      //计算总的热搜页数
      this.data.resoPages = Math.ceil(this.data.reso.length / pageSize);
      if (this.data.resoPages > 0) {
        //显示第1页热搜关键字
        this.data.resoPage = 1;
        //选择热搜关键字
        this.onPickReso();
      }
    });
    let soList = wx.getStorageSync('recentSo');
    this.setData({
      recentSo:soList
    });
  },
//切换搜索方式
  onChangeTab: function (event) {
    let tab = search.getDataSet(event, 'so');
    this.setData({
      curTab: tab
    })
  },

//点击热门关键字搜索
  onKeywordSo:function(event){
    let url = search.getDataSet(event,'so');
    wx.navigateTo({
      url: url,
    });
  },
//提交搜索内容
  formSubmit: function (event) {
    //保存搜索记录到手机
    let soList = wx.getStorageSync('recentSo');
    if(!soList){
      soList=[];
    }
    soList.push(event.detail.value.so);
    wx.setStorageSync('recentSo', soList);
    //重新渲染搜索历史
    this.setData({
      recentSo:soList
    })
  },

//清空搜索历史
  onClearSoList:function(){
    wx.setStorageSync('recentSo', []);
    this.setData({
      recentSo:[]
    })
  },
  //随机更换热搜关键字
  onPickReso() {
    if (this.data.resoPages <= 0) return;
    if (this.data.resoPage > this.data.resoPages) {
      this.data.resoPage = 1;
    }
    let start = (this.data.resoPage - 1) * pageSize;
    this.setData({
      showReso: this.data.reso.slice(start, start + pageSize)
    });
    //下次显示的页数
    this.data.resoPage++;
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