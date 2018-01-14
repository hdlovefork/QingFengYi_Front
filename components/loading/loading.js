// components/loading/loading.js
import {Config} from '../../utils/config.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //是否显示
    visible:{
      type:Boolean,
      value:true
    },
    content:{
      type:String,
      value:'拼命加载中...'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    baseUrl: Config.baseUrl
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
