//source
//file:///Users/tinaojha/Downloads/nodebeginner.pdf
var http = require("http");
var url = require("url");

/*http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);*/

//the above listen method can also be written also
//var server = http.createServer();
//server.listen(8888);

//the above can also be written
//var http = require("http");
//function onRequest(request, response) {
//response.writeHead(200, {"Content-Type": "text/plain"});
//response.write("Hello World");
//response.end();
//}
//http.createServer(onRequest).listen(8888);
function start(route, handle){
  function onRequest(request, response) {
    //var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received");
    route(handle, pathname, response, request);
    /*request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '"+
      postDataChunk + "'.");
    });

    request.addListener("end", function(){
      route(handle, pathname, response, postData);
    });*/
    //route(handle, pathname, response);
  }
    //response.writeHead(200, {"Content-Type": "text/plain"});
    //var content = route(handle, pathname);
    //response.write(content);
    //response.end();

  http.createServer(onRequest).listen(8888);
  console.log("Server has started");
}

exports.start = start;




