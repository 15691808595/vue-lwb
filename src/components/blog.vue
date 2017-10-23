<template>
	<div class="row">
    <div class="col-md-3">
      <article-type></article-type>
      <visit></visit>
    </div>
    <div class="col-md-9">
      <div class="post-list-container">
        <form action="#" method="post" v-show="searchIsShow">
          <div class="row">
            <div class="col-sm-10">
              <div class="input-group my-input-group">
                <input type="text" name="wd" class="form-control" placeholder="全局title搜索" @input="search">
                <span class="input-group-addon my-addon search">
												<i class="glyphicon glyphicon-search"></i>
												搜索
											</span>
              </div>
            </div>
            <div id="post-btn" class="col-sm-2">
              <a :href="'#/blog/postArticle'" @click="postArticle" class="btn btn-success">
                <i class="glyphicon glyphicon-edit"></i>
                <span   class="post-action">发布文章</span>
              </a>
            </div>
          </div>
        </form>

        <div class="row">
          <!--文章列表容器--->
          <!--<article-all></article-all>-->
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
          <h1 v-show="searchResultIsShow">没有搜到内容，请检查搜索关键词</h1>
          <!--分页栏-->
          <pagination v-show="paginationIsShow"></pagination>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  import ArticleType from './panel/category.vue'
  import Visit from './panel/visit.vue'
  import ArticleAll from './article/All.vue'
  import pagination from './pagination/pagination.vue'
  import {mapGetters} from 'vuex'
  import {myPag} from '../components/pagination/myPag'

export default {
  computed:{
    ...mapGetters([
      'searchIsShow','searchResultIsShow','paginationIsShow','pageNum'
    ])
  },
  methods:{
    postArticle(){
      this.$store.state.paginationIsShow=false;
      this.$store.state.searchIsShow=false;
    },
    search(){
      let wd=$("[name=wd]").val();
      let arr=[];
      $.ajax({
        url:'/getInput',
        type:'post',
        async:false,
        data:{wd},
        success(data){
          console.log(data);
          arr=data;
        }
      });
      this.$store.state.titleList=arr;

      if(this.$store.state.titleList.length===0){
        this.$store.state.searchResultIsShow=true;
        this.$store.state.paginationIsShow=false;
      }else {
        this.$store.state.searchResultIsShow=false;
        this.$store.state.paginationIsShow=true;
      }

      $("#page").paging({
        pageNo:7,
        totalPage: Math.ceil(this.$store.state.titleList.length / this.$store.state.pageNum),
        totalSize: this.$store.state.titleList.length,
        callback: function(num) {
//          alert(num)
        }
      })
    }
  },
    data(){
      return {
      }
    },
    components:{
      ArticleType,
      Visit,
      ArticleAll,
      pagination
    }

}
</script>

<style scoped>

</style>
