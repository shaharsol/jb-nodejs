const server = require('http');

const HOST = 'localhost';
const PORT = '8080';

const requestListener = function (req, res) {
    console.log(req);
    if (req.url === '/name') {
        res.writeHead(200);
        return res.end("name endpoint");
    }

    if (req.url === '/age') {
        res.writeHead(200);
        return res.end("age endpoint");
    }

    res.writeHead(404);
    return res.end("not found");
};

const server = createServer(requestListener);

server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
