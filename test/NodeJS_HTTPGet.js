//当前Demo以工商接口中，模糊搜索为例
//接口请求示例为：https://pro.qichacha.com/api/yj/ECIV4/SearchWide?key=AppKey&keyword=苏州朗动网络科技有限公司

var md5=require('md5-node');

let Userkey='您的Key'

let TimeSpan=Math.round(new Date /1000);

let SecretKey='您的SecretKey';

let Token=md5(Userkey+TimeSpan+SecretKey).toUpperCase();

var http = require("http");  
var querystring = require('querystring');
  
var data = {key:Userkey,keyword:'您的搜索关键字'};  
var content = querystring.stringify(data);
  
var options = {  
    hostname:'pro.qichacha.com',
    method:'GET',  
    path:'/api/yj/ECIV4/SearchWide?'+content,  
    headers:{  
        "Token": Token, 
		"Timespan":TimeSpan
    }  
}  
  
var req = http.request(options, function (res) { 
    console.log('STATUS: ' + res.statusCode); 
    console.log('HEADERS: ' + JSON.stringify(res.headers)); 
    res.setEncoding('utf8'); 
    res.on('data', function (chunk) { 
        console.log('BODY: ' + chunk); 
    }); 
}); 
   
req.on('error', function (e) { 
    console.log('problem with request: ' + e.message); 
}); 
   
req.end();