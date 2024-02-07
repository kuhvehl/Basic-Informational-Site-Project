const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    
    // Map specific URLs to corresponding HTML files
    if (filePath === './' || filePath === './index') {
        filePath = '/index.html';
    }
    if (filePath === './about') {
        filePath = '/about.html';
    }
    if (filePath === './contact-me' || filePath === './contact') {
        filePath = '/contact-me.html';
    }

    filePath = path.join(__dirname, filePath);

    // Read the file and serve the appropriate HTML
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // If file not found, serve 404.html
            if (err.code === 'ENOENT') {
                fs.readFile('./404.html', (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                // For other errors, serve a generic error message
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('Internal Server Error');
            }
        } else {
            // Serve the requested HTML file
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
