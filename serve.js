var static = require('node-static');
var file = new static.Server('./src');
var modules = new static.Server('./');


require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        if(request.url.includes('/node_modules/')) {
            modules.serve(request, response);
        } else {
            file.serve(request, response);
        }
    }).resume();
}).listen(4200);

console.log('Serving on http://localhost:4200/');
