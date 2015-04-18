var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/JSON"
};


exports.sendResponse = function(response, data,statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

exports.collectData = function (request, cb) {
  console.log('in collectData!');
  // statusCode = 201;
  var body = "";
  request.on('data', function(data){
    body += data;
    console.log(body)
  });

  request.on('end', function() {
    console.log(JSON.parse(body))
    cb(JSON.parse(body));
  });
};
