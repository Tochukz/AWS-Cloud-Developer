const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const os = require("os");

// Create HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Route requests
  if (pathname === "/") {
    serveHomePage(req, res);
  } else if (pathname === "/info") {
    serveSystemInfo(req, res);
  } else if (pathname.startsWith("/public/")) {
    serveStaticFile(req, res);
  } else {
    serveNotFound(req, res);
  }
});

// Serve home page
function serveHomePage(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Simple Node App</title>
      <link rel="stylesheet" href="/public/style.css">
    </head>
    <body>
      <h1>Welcome to Simple Node App</h1>
      <p>This app uses only native Node.js modules</p>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/info">System Info</a></li>
      </ul>
    </body>
    </html>
  `);
}

// Serve system information
function serveSystemInfo(req, res) {
  const systemInfo = {
    platform: os.platform(),
    architecture: os.arch(),
    cpuCount: os.cpus().length,
    totalMemory: `${(os.totalmem() / (1024 * 1024)).toFixed(2)} MB`,
    uptime: `${(os.uptime() / 60).toFixed(2)} minutes`,
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || "development",
  };

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(systemInfo, null, 2));
}

// Serve static files
function serveStaticFile(req, res) {
  const filePath = path.join(__dirname, req.url);
  const extname = path.extname(filePath);
  const contentType =
    {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "text/javascript",
    }[extname] || "text/plain";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        serveNotFound(req, res);
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
}

// Handle 404
function serveNotFound(req, res) {
  res.writeHead(404, { "Content-Type": "text/html" });
  res.end(
    "<h1>404 Not Found</h1><p>The page you requested could not be found.</p>"
  );
}

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

// Handle shutdown gracefully
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
