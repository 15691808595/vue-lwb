<template>
  <div class="col-sm-12 animated bounceInRight">
    <form action="#" method="post" class="form-horizontal">
      <!--文章标题-->
      <div class="form-group">
        <div class="col-sm-10">
          <input type="text" class="form-control" name="title" placeholder="文章标题">
        </div>
        <!-- 文章分类-->
        <div class="form-group">
          <div class="col-sm-2">
            <select class="form-control" name="articleType" id="">
              <option value="0">文章类型</option>
              <option value="h5">html</option>
              <option value="css">css</option>
              <option value="js">javascript</option>
              <option value="php">php</option>
              <option value="mysql">mysql</option>
              <option value="server">服务器</option>
              <option value="others">其他</option>
            </select>
          </div>
        </div>
      </div>
      <!--原文url链接地址-->
      <div class="form-group">
        <div class="col-sm-12">
          <input type="text" class="form-control" name="url" placeholder="原文的URL链接地址">
        </div>
      </div>
      <!--文章内容在线编辑器-->
      <div class="form-group">
        <div class="col-sm-12">
          <!--将id为editor的div变成在线编辑器-->
          <div id="editor" style="min-height: 500px;"></div>
          <!--将id为editor的div变成在线编辑器-->

        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-12">
          <a href="javascript:;" class="btn btn-success pull-right" type="submit" id="submit" @click="submit">发布文章</a>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
  export default {
    methods: {
      submit() {
        //获取需要发布的文章信息（标题，url,内容）
        let title = $("[name='title']").val();
        let url = $("[name='url']").val();
        let type = $("[name='articleType']").val();

        //获取在线编辑器的html内容
        let content = editor.$txt.html();
        //获取在线编辑器的纯文本
        let text = editor.$txt.text();
        console.log(text);
        if (type == 0 || title == '' || text == '') {
          alert('标题，内容和文章类型不能为空')
          return false;
        }
        $.ajax({
          type: "post",
          url: "/postArticle",
          data: {title, url, content, text, type},
          success(data, status, xhr) {
            console.log(status);
            if (status == 'success') {
              alert('发表成功');
            }
          },
          error(xhr, stauts) {
            alert('发布失败')
          }
        });

        return false;
      }
    },
    created(){
      this.$store.state.searchIsShow=false;
    }
  }
</script>
<style scoped>
  .post-item-container {
    margin-bottom: 30px;
    border-bottom: 1px dashed #d9d9d9;
  }

  .text-danger span {
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
    border: 1px solid #dce0e0 !important;
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
    border: 1px solid #0073A9 !important;
  }

  #prePage,
  #nextPage {
    width: 70px;
    color: #0073A9;
    border: 1px solid #0073A9 !important;
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
