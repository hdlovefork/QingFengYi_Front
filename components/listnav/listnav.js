// components/catenav/catenav.js
import { ListNav } from 'listnav-model.js';

var listNav = new ListNav();

Component({
  /**
     * 组件的属性列表
     */
  properties: {
    category: {
      type: Array,
      value: [],
    },
    curCid: {
      type: Number,
      value: 2
    }
  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  methods:{
    onTap:function(event){
      let index = listNav.getDataSet(event, 'idx');
      this.setData({
        curCid: this.data.category[index].cid
      })
      this.triggerEvent('Switch', {cid:this.data.category[index].cid});//触发TAB更换事件
    }
  },

  attached: function () {
    listNav.get((res) => {
      this.setData({
        category: res.category,
        curCid:res.curCid       
      },()=>{
        this.triggerEvent('Switch', {cid:this.data.curCid});//触发TAB更换事件
      })
    });    
  },  
})