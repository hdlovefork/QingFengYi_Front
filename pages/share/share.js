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
    rateInfo:null,//淘宝数据
    baseUrl:Config.baseUrl,
    quanInfo:{},
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
    //淘宝详情描述信息
    share.getDetail(tbid,(res)=>{
      let pics ={}
      //添加主图
      pics['main'] = res.data.itemInfoModel.picsPath;      
      //添加评论图
      res.data.rateInfo.rateDetailList.forEach(function(value,index,arr){
        pics[index] = value.ratePicList;
      });

      this.setData({
        rateInfo:res.data.rateInfo,
        title: res.data.itemInfoModel.title,
        pics: pics,
        isTmall: /tmall.com/.test(res.data.itemInfoModel.itemUrl) ? true:false,
        shopIcon:res.data.seller.picUrl,
        shopName:res.data.seller.shopTitle,
      })
     
    })
    
    share.getQuanInfo(tbid,(res)=>{
      this.setData({
        quanInfo:res
      })
    })
  },
//预览图片
showImage:function(event){
  let key = share.getDataSet(event,'src');
  this._addProtocol(this.data.pics[key]);
  wx.previewImage({
    urls:this.data.pics[key]
  })
},
//将图片数组中的每张图片添加协议
_addProtocol:function(pics){
  pics.forEach(function (item, index, arr){
    arr[index] = item.startsWith('https:') ? arr[index] : 'https:' + arr[index];
  });
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