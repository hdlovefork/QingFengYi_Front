// pages/share/share.js
import { Share } from "share-model.js";
import { Config } from "../../utils/config.js";

var share = new Share();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tbid: 0,
    dtkid: 0,
    istmall: false,
    pics: {},//主图和评论图片['main',0,1,2]二维数组,main为主图，数字索引为评论图片
    title: '',
    shopName: '',
    rateInfo: null,//淘宝数据
    baseUrl: Config.baseUrl,
    quanInfo: {},//优惠券面额信息
    props: {}, //商品属性
    loadImage: true,//没有加载商品详情描述图？
    showFootTKL: false,//显示底部领券？
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.tbid = options.i;
    this.data.dtkid = options.ti;
    this.data.from = options.x;
    this._init({
      tbid: this.data.tbid,
      dtkid: this.data.dtkid
    });
  },

  _init(ids) {
    //淘宝详情描述信息
    share.getDetail(ids, (res) => {
      let pics = {}
      //添加主图
      pics['main'] = res.data.itemInfoModel.picsPath;
      //添加评论图
      res.data.rateInfo.rateDetailList.forEach(function (value, index, arr) {
        pics[index] = value.ratePicList;
      });

      this.setData({
        rateInfo: res.data.rateInfo,
        title: res.data.itemInfoModel.title,
        pics: pics,
        props: res.data.props,
        isTmall: /tmall.com/.test(res.data.itemInfoModel.itemUrl) ? true : false,
        shopIcon: res.data.seller.picUrl,
        shopName: res.data.seller.shopTitle,
      })

    })

    share.getQuanInfo(ids, (res) => {
      this.setData({
        quanInfo: res
      })
    })
  },
  onShowRates(event){
    wx.navigateTo({
      url: '/pages/rate/rate?tbid='+this.data.tbid,
    })
  },
  //点击立即领券
  onLingQuan(event) {
    //设置服务器需要的参数
    let data = {
      tbid: this.data.quanInfo.taoid,
      activity:this.data.quanInfo.activity
    };
    //调用API获取淘口令
    share.getTKL(data, (res) => {
      if(!res || !res.tkl){
        //服务器没有返回数据
        wx.showModal({
          title: '温馨提示',
          content: '该宝贝没有优惠券，请换个宝贝试试吧！'
        })
      }else{
        //设置剪切板为淘口令并提示
        wx.setClipboardData({
          data: res.tkl,
          success:function(){
            wx.showModal({
              title: '温馨提示',
              cancelText: '查看教程',
              confirmColor:'#000',
              cancelColor:'#3CC51F',
              confirmText: '知道了',
              content: res.gmtip,
              success: function (res) {
                if (res.cancel) {
                  wx.navigateTo({
                    url: '/pages/jiaocheng/jiaocheng?mini=1',
                  });
                }
              }
            })
          },
          fail:function(){
            wx.showToast({
              title: '复制到剪切板失败，请重试！',
            })
          }
        })
      }
    })
  },
  //预览图片
  onShowImage: function (event) {
    let key = share.getDataSet(event, 'src');
    this._addProtocol(this.data.pics[key]);
    wx.previewImage({
      urls: this.data.pics[key]
    })
  },

  //滚动条正在滚动
  onScroll: function (event) {
    console.log(event.detail.scrollTop);
    if (event.detail.scrollTop < 450) {
      this.setData({
        showFootTKL: false
      })
    }
  },
  //显示底部领券
  onShowFootTKL: function (event) {
    this.onLoadImage(event);
    this.setData({
      showFootTKL: true
    })
  },

  //隐藏底部领券
  onHideFootTKL: function (event) {
    this.setData({
      showFootTKL: false
    })
  },

  //将图片数组中的每张图片添加协议
  _addProtocol: function (pics) {
    pics.forEach(function (item, index, arr) {
      arr[index] = item.startsWith('https:') ? arr[index] : 'https:' + arr[index];
    });
  },

  //加载图片
  onLoadImage: function () {
    if (this.data.loadImage === false) return;
    this.data.loadImage = false;
    let ids = {
      tbid: this.data.tbid,
      dtkid: this.data.dtkid
    };
    share.getDetailPics(ids, (res) => {
      this.data.pics['detailPics'] = res;
      this.setData({
        pics: this.data.pics,
        loadImage: false
      })
    })
  },
  onPageScroll: function (event) {
    if (event.scrollTop > 450) {
      this.onShowFootTKL();
    } else {
      this.onHideFootTKL();
    }
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
    this.onLoadImage()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})