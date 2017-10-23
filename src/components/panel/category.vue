<template>
  <div class="panel panel-info">
    <div class="panel-heading">
      <h3 class="panel-title">文章分类</h3>
    </div>
    <div class="list-group" @click="linkBlog">
      <div v-for="(item,index) in category"
                   class="list-group-item animated article-type"
           :class="{green:nowIndex==index}"
           @click="showTabBg(item,index)"
      >
        <img :src="item.src" :alt="item.title" />
        {{ item.title }} ({{item.typeNum}})
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {myPag} from '../pagination/myPag'
export default {
  data(){
    return {
      nowIndex:0,
    }
  },
  computed:{
    ...mapGetters([
      'category','pageNum'
    ])
  },
  methods:{
    showTabBg(item,index){
      this.$store.state.nowPageNum=1;
      console.log(this.$store.state.nowPageNum)
      this.$store.state.paginationIsShow=true;
      this.$store.state.titleList=this.$store.state.saveTitleList;
      this.nowIndex=index;
      console.log(item.path);
      let arr=[];
      if(item.path==='all'){
        this.$store.state.titleList=this.$store.state.saveTitleList;
        $("#page").paging({
          pageNo:7,
          totalPage: Math.ceil(this.$store.state.titleList.length / this.$store.state.pageNum),
          totalSize: this.$store.state.titleList.length,
          callback: function(num) {
//            alert(num)
          }
        })
        return
      }
      $.each(this.$store.state.titleList,(index,ele)=>{
        if(ele.type==item.path){
          arr.push(ele)
        }
      });
      this.$store.state.titleList=arr;

      this.$store.state.searchIsShow=true;
        console.log("分页："+this.$store.state.titleList.length);
      $("#page").paging({
        pageNo:7,
        totalPage: Math.ceil(this.$store.state.titleList.length / this.$store.state.pageNum),
        totalSize: this.$store.state.titleList.length,
        callback: function(num) {
//          alert(num)
        }
      })
    },
    linkBlog(){
      window.location.href='#/blog/all'
    }
  },
}
</script >
<style scoped>
  .list-group-item{
    cursor: pointer;
  }
  .list-group-item img{
    padding-right: 10px;
    width: 35px;
  }
  .green{
    background-color: lightblue;
  }
</style>
