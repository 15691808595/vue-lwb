<template>
  <div>
    <div @click="getNowPageNum"  id="page" class="page_div"></div>
  </div>
</template>
<script>

  import './paging'
  import {mapGetters} from 'vuex'
  import {myPag} from './myPag'
  export default {
    components: {
    },
    computed:{
      ...mapGetters([
        'category','pageNum'
      ])
    },
    data(){
      return{
      }
    },
    methods:{
      getNowPageNum(){
//        this.$store.state.nowPageNum=Number($("#page>.current").html())+1;
//        console.log(this.$store.state.nowPageNum)
        $("body").animate({
          "scrollTop":'0px'
        },500)
      }
    },
    mounted(){
    }
  }
</script>
<style >
  .page_div {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 15px;
    font-family: "microsoft yahei";
    color: #666666;
    margin-right: 10px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  /*
   * 页数按钮样式
   */
  .page_div a {
    min-width: 30px;
    height: 28px;
    border: 1px solid #dce0e0!important;
    text-align: center;
    margin: 0 4px;
    cursor: pointer;
    line-height: 28px;
    color: #666666;
    font-size: 13px;
    display: inline-block;
  }
  #firstPage,
  #lastPage {
    width: 50px;
    color: #0073A9;
    border: 1px solid #0073A9!important;
  }
  #prePage,
  #nextPage {
    width: 70px;
    color: #0073A9;
    border: 1px solid #0073A9!important;
  }
  .page_div .current {
    background-color: #0073A9;
    border-color: #0073A9;
    color: #FFFFFF;
  }
  .totalPages {
    margin: 0 10px;
  }
  .totalPages span,
  .totalSize span {
    color: #0073A9;
    margin: 0 5px;
  }

</style>
