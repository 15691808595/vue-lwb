<template>
  <div class="col-sm-12 list-container">
    <div style="margin-bottom: 20px" class="col-sm-12 animated bounceInRight">
      <div class="post-list-container">
        <div class="row">
          <div class="col-sm-12 list-container">
            <h3 class="page-header text-center">{{detail.title}}</h3>
            <!--文章详情-->
            <div class="article-info">
              <ul class="text-muted clearfix">
                <li class="pull-left">发布时间：{{detail.createTime | formatDate}}</li>
                <li class="pull-left">作者：{{detail.user}}</li>
                <li class="pull-left">浏览次数：{{detail.visitor}}</li>
              </ul>
            </div>
            <!--文章内容-->
            <div class="article-content lead" style="font-size:15px;" v-html="detail.content">


            </div>
          </div>
        </div>
      </div>
      <!--点赞-->
      <div class="row" style="margin: 0;">
        <div class="pull-right"><span class="num-zan">1</span><i data-id="126"
                                                                 class="fa fa-thumbs-up fa-2x zan animated"></i></div>
      </div>
      <!--上一篇 下一篇-->
      <div class="row">
        <a href="">上一篇：jade-起步</a>
      </div>
    </div>
  </div>
</template>
<script>
  import {formatDate} from './formatTime'
  import {mapGetters} from 'vuex'
  export default {
    components:{},
    computed:{
      ...mapGetters([
        'detail'
      ])
    },
    filters:{
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    methods:{
    },
    mounted(){

    }
  }
</script>
<style scoped>
.list-container{
  color: #b5adad;
}
  pre{
    background-color: lightgrey !important;
  }
  .article-info ul li{
    padding-right: 42px;
  }
</style>
