const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 8080;

const server = http.createServer((req, res) => {
  let filePath;
  let contentType = "text/html";
  if (req.url === "/") {
    filePath = path.join(__dirname, "index.html");
  } else if (req.url === "/about") {
    filePath = path.join(__dirname, "about.html");
  } else if (req.url === "/contact-me") {
    filePath = path.join(__dirname, "contact-me.html");
  } else if (req.url === "/styles.css") {
    filePath = path.join(__dirname, "styles.css");
    contentType = "text/css";
  } else {
    filePath = path.join(__dirname, "404.html");
    res.statusCode = 404;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end("Server Error");
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
