const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

// Serve static files from the "pages" directory
app.use(express.static(path.join(__dirname, "pages")));

// Serve CSS file from the root directory
app.use(express.static(__dirname));

// Route handlers for different pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "about.html"));
});

app.get("/contact-me", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "contact-me.html"));
});

// Handle 404 errors for any undefined routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "pages", "404.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
