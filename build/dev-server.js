require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')


// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

// 添加交互
var mysql = require('mysql')
var qs=require("querystring")
//连接mysql
var pool = mysql.createPool({
  host:'127.0.0.1',
  user:'root',
  password:'',
  database:'blog',
  connectionLimit:10
});


app.get("/getLengthData",(req,res)=>{
  pool.getConnection((err,conn)=>{
    let sql = "SELECT * FROM article2 order by createTime desc";
    conn.query(sql,(err,result)=>{
      res.json(result);
      conn.release();
    });
  });
});
app.post("/getInput",(req,res)=>{
  req.on("data",(data)=>{
    var obj = qs.parse(data.toString());
    // var obj = data.toString();
    var wd=obj.wd;
    var decodeWd=encodeURIComponent(wd);
    console.log(wd);
    pool.getConnection((err,conn)=>{
    var sql = "select * from article2  where title like '%"+wd+"%' order by createTime desc";
    conn.query(sql,(err,result)=>{
      res.json(result);
      conn.release();
    });
  });
  });
});

// 把反馈信息存到数据库
app.post("/user_item",(req,res)=>{
  req.on("data",(data)=>{
    var obj = qs.parse(data.toString());
    // var obj = data.toString();
    console.log(obj);
    var rn = obj.name;
    var re = obj.email;
    var rq = obj.qq;
    var rp = obj.phone;
    var rm = obj.message;
    pool.getConnection((err,conn)=>{
      var sql = "INSERT INTO user_item VALUES(NULL,?,?,?,?,?)";
      conn.query(sql,[rn,re,rq,rp,rm],(err,result)=>{
        res.json(result);
        conn.release();
      });
    });
  });
});
// 发表文章的内容放到数据库
app.post("/postArticle",(req,res)=>{
  req.on("data",(data)=>{
    var obj = qs.parse(data.toString());
    // var obj = data.toString();
    console.log(obj);
    var rn = obj.title;
    var re = obj.url;
    var rq = encodeURIComponent(obj.content);
    var rm = obj.type;
    var img = rm+".png";
    var time= new Date().getTime();
    console.log('time:'+time);
    pool.getConnection((err,conn)=>{
      var sql = "insert into article2(title,url,content,`type`,img,createTime) values(?,?,?,?,?,?)";
      conn.query(sql,[rn,re,rq,rm,img,time],(err,result)=>{
        res.json(result);
        conn.release();
      });
    });
  });
});

// 添加交互



var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
