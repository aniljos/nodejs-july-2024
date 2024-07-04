const http = require('http');

const server = http.createServer((req, res) => {

    if(req.url === '/'){

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Hello World');
        res.end();
    }
    if(req.url === '/about'){

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('This is a simple http server created using Node.js');
        res.end();
    }


});

server.listen(9010, () => {
    console.log('Http Server is running at port 9010...');
});


