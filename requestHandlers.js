//var exec = require("child_process").exec;
var querystring = require("querystring"),
  fs = require("fs"),
  formidable = require("formidable");

function start(response) {
  console.log("Request handler 'start' was called.");
  //var content = "empty";

  var body = '<html>'+
  '<head>'+
  '<meta http-equiv="Content-Type" '+
  'content="text/html; charset=UTF-8" />'+
  '</head>'+
  '<body>'+
  '<form action="/upload" enctype="multipart/form-data" ' +
  'method="post">'+
  '<input type="file" name="upload" multiple="multiple">' +
  '<input type="submit" value="Upload file" />'+
  '</form>'+
  '</body>'+
  '</html>';

  //exec("find /",
    //{ timeout: 10000, maxBuffer: 20000*1024 },
    //function (error, stdout, stderr) {
    //content = stdout;
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
  //});

  //return content;

}
/*  function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
  }

  sleep(10000);
  return "Hello Start";
}*/

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");

    fs.rename(files.upload.path, "./tmp/test.png", function(error){
      if (error) {
        fs.unlink("./tmp/test.png");
        fs.rename(files.upload.path, "./tmp/test.png");
      }
    });

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("received image:<br/>");
  response.write("<img src='/show' />");
  response.end();
  //return "Hello Upload";
  });
}

function show(response) {
  console.log("Request handler 'show' was called.");
  response.writeHead(200, {"Content-Type": "image/png"});
  fs.createReadStream("./tmp/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
