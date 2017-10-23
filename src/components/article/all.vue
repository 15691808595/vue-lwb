<template>
  <div class="col-sm-12 list-container">
    <div
      class="post-item-container"
      v-for="(item,index) in allData"
      v-show="index<pageNum*nowPageNum && index>=9*(nowPageNum-1)"
    >
      <h4>
        <a :href="'#/blog/detail?id='+item.id" @click="getId(item.id)">{{item.title}}</a>

        <img :src="'../../static/imgs/'+item.img" height="24" width="24" class="pull-right">
      </h4>
      <p class="text-danger">
        <span class="user">{{item.user}}</span>
        <span class="dateTime">{{item.createTime }}</span>
        <span class="visit"><i class="glyphicon glyphicon-eye-open"></i> {{item.visitor}}</span>
        <span class="like"><i class="glyphicon glyphicon-thumbs-up"></i> {{item.like}}</span>
      </p>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {formatDate} from './formatTime'
  import {myPag} from '../pagination/myPag'
export default {
  components:{},
  computed:{
    ...mapGetters([
      'allData','pageNum','nowPageNum'
    ])
  },
  filters:{
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  mounted(){
  },
  created(){
    this.$http.get("/getLengthData")
      .then((res)=>{
      console.log(res.data)
        this.$store.state.titleList=res.data;
        this.$store.state.saveTitleList=res.data;
        let all=res.data.length;
        let h5=0,css=0,js=0,php=0,mysql=0,others=0,server=0;

        let _this=this;
        $("#page").paging({
          pageNo:7,
          totalPage: Math.ceil(this.$store.state.titleList.length / this.$store.state.pageNum),
          totalSize: this.$store.state.titleList.length,
          callback(num) {
            _this.$store.state.nowPageNum=num;
          }
        });

        $.each(res.data,(index,ele)=>{
          switch (ele.type){
            case 'h5':
              h5++;
              this.$store.state.category[1].typeNum=h5;
              break;
            case 'css':
              css++;
              this.$store.state.category[2].typeNum=css;
              break;
            case 'js':
              js++;
              this.$store.state.category[3].typeNum=js;
              break;
            case 'php':
              php++;
              this.$store.state.category[4].typeNum=php;
              break;
            case 'mysql':
              mysql++;
              this.$store.state.category[5].typeNum=mysql;
              break;
            case 'server':
              server++;
              this.$store.state.category[6].typeNum=server;
              break;
            case 'others':
              others++;
              this.$store.state.category[7].typeNum=others;
              break;
          }
        });
        this.$store.state.category[0].typeNum=all;
        console.log(this.$store.state.category)
      })

    this.$store.state.searchIsShow=true;
  },
  methods:{
    getId(data){
      this.$store.state.paginationIsShow=false;
      $.each(this.$store.state.titleList,(index,ele)=>{
        if(ele.id==data){
          this.$store.state.detail.id=ele.id;
          this.$store.state.detail.title=ele.title;
          this.$store.state.detail.createTime=ele.createTime;
          this.$store.state.detail.user=ele.user;
          this.$store.state.detail.visitor=ele.visitor;
          this.$store.state.detail.content=decodeURIComponent(ele.content);
        }
      });
      this.$store.state.searchIsShow=false;
    },
    pagnam(){

    }
  }
}
</script>
<style scoped>
  .post-item-container {
    margin-bottom: 30px;
    border-bottom: 1px dashed #d9d9d9;
  }
  .text-danger span{
    margin-right: 25px;
  }
  /*分页*/
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
