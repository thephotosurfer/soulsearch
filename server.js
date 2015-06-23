var http = require('http');
var request = require('request');
var fs = require('fs');
var search = '';
var raph = "";
var jsMindmap = '';
var searchJS = "";
var style = "";
var mindStyle = '';
fs.readFile('./search.html', function (err,html){
	search = html;
});
fs.readFile('./raphael-min.js', function (err,html){
  raph = html;
});
fs.readFile('./js-mindmap.js', function (err,html){
  jsMindmap = html;
});
fs.readFile('./search.js', function (err,html){
  searchJS = html;
});
fs.readFile('./style.css', function (err,html){
  style = html;
});
fs.readFile('./js-mindmap.css', function (err,html){
  mindStyle = html;
});
http.createServer(onRequest).listen(process.env.PORT || 3000);

function onRequest(client_req, client_res) {
  if(client_req.url.indexOf('search.html')>-1){
	      client_res.writeHead(200,{"Content-Type": "text/html"});
        client_res.end(search);
        return;
  }  
  if(client_req.url.indexOf('raphael-min.js')>-1){
        client_res.writeHead(200,{"Content-Type": "application/javascript"});
        client_res.end(raph);
        return;
  } 
  if(client_req.url.indexOf('js-mindmap.js')>-1){
        client_res.writeHead(200,{"Content-Type": "application/javascript"});
        client_res.end(jsMindmap);
        return;
  } 
  if(client_req.url.indexOf('search.js')>-1){
        client_res.writeHead(200,{"Content-Type": "application/javascript"});
        client_res.end(searchJS);
        return;
  } 
  if(client_req.url.indexOf('style.css')>-1){
        client_res.writeHead(200,{"Content-Type": "text/css"});
        client_res.end(style);
        return;
  } 
  if(client_req.url.indexOf('js-mindmap.css')>-1){
        client_res.writeHead(200,{"Content-Type": "text/css"});
        client_res.end(mindStyle);
        return;
  }  
  if(client_req.url.indexOf('?url=')>-1){
        var url = client_req.url.substring(client_req.url.indexOf('url=')+4);
        console.log(url);
        var options = {
          url:url,
          method: 'GET'
        };

        request(options, function (error, res) {
              client_res.write(res.body);
        client_res.end(''); 
        });
  }  
  else {
      client_res.end(''); 
  }


}
