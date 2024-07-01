var http = require('http');
var url = require('url');
var fs = require('fs');
require('dotenv').config();

const hostname = process.env.hostname;
const port = process.env.port;

function writeHtmlFile(res, filename) {
    fs.readFile(filename, function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}

http.createServer(function (req, res) {
    let urlPath = url.parse(req.url, true).pathname;
    if (urlPath == '/' || urlPath == '/index') {
        writeHtmlFile(res, './index.html');
    } else if (urlPath == '/about') {
        writeHtmlFile(res, './about.html');
    } else if (urlPath == '/contact-me') {
        writeHtmlFile(res, './contact-me.html');
    } else {
        writeHtmlFile(res, './404.html');
    }

}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});