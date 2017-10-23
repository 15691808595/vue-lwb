import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


export const store = new Vuex.Store({
  state:{
    titleList:[], // 文章的数据
    saveTitleList:[], // 保存一份文章的数据
    category:[
      {
        title:'所有文章',
        path:'all',
        src:require('../../static/imgs/all.png'),
        typeNum:0
      },
      {
        title:'html',
        path:'h5',
        src:require('../../static/imgs/h5.png'),
      },
      {
        title:'css',
        path:'css',
        src:require('../../static/imgs/css.png')
      },
      {
        title:'js',
        path:'js',
        src:require('../../static/imgs/js.png')
      },
      {
        title:'php',
        path:'php',
        src:require('../../static/imgs/php.png')
      },
      {
        title:'mysql',
        path:'mysql',
        src:require('../../static/imgs/mysql.png')
      },
      {
        title:'server',
        path:'server',
        src:require('../../static/imgs/server.png')
      },
      {
        title:'others',
        path:'others',
        src:require('../../static/imgs/node.png')
      }
    ], // 文章分类的数量和数据
    detail:{
      id:'',
      createTime:'',
      title:'',
      user:'',
      visitor:'',
      content:''
    }, // 文章详情页面
    searchIsShow:true, // 搜索框是否显示
    searchResultIsShow:false, // 搜索结果搜不到的显示
    paginationIsShow:true,  // 分页的显示
    pageNum:9, // 分页展示的数量
    nowPageNum:1, //现在的页码
  },
  getters:{
    nowPageNum:(state)=>{
      return state.nowPageNum
    },
    pageNum:(state)=>{
      return state.pageNum
    },
    paginationIsShow:(state)=>{
      return state.paginationIsShow
    },
    searchResultIsShow:(state)=>{
      return state.searchResultIsShow
    },
    searchIsShow:(state)=>{
      return state.searchIsShow
    },
    detail:(state)=>{
      return state.detail
    },
    category:(state)=>{
      return state.category
    },
    allData:(state)=>{
      return state.titleList;
    }
  },
  // mutations:{
  //   reducePrice:(state,payload)=>{
  //     state.products.forEach(product=>{
  //       product.price-=payload
  //     })
  //   }
  // },
  // actions:{
  //   reducePrice:(context,payload)=>{
  //     // setTimeout(function () {
  //       context.commit('reducePrice',payload)
  //     // },2000)
  //   }
  // }
});
