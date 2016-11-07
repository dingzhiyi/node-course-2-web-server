const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
//set the port for both heroku and local
const port = process.env.PORT || 3000;
var app = express();
//加上————dirname是因为只能读取绝对路径
//注册模板
hbs.registerPartials(__dirname + '/views/partials');
//在使用hbs之前必须要进行注册
app.set('view engine','hbs');
//因为没有加上next()所以永远不会前进
/*
下面这段代码middleware可以用来显示maintance界面
app.use((req,res,next)=>{
    res.render('maintance.hbs');
});
*/
//app.use的排序很重要
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n');
  next();
});

//注册可以在所有hbs文件中使用的函数或者属性
hbs.registerHelper('getCurretYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
  //res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage:'Welcome to my page!'
  });
});

app.get('/portfolio',(req,res)=>{
  res.render('portfolio.hbs',{

  });
});



app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',
  });
});

app.get('/bad',(req,res)=>{
  res.send({
      errorMessage:'Unable to handle request'
  });
});
//在listen里面加上console。log可以在console里面写入下述console
app.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
