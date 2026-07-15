const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const dataFilePath = path.join(__dirname, "notes.txt");

const server = http.createServer((req, res) => {
  const method = req.method;
  const pathname = req.url.split("?")[0];
  const text = new URL(req.url, `http://${req.headers.host}`).searchParams.get("text") || "Hello";

  // Simple res.send helper
  res.send = (message) => res.end(message);

  // Nested if/else routing
  if (pathname === "/") {
    if (method === "GET") {
      res.statusCode = 200;
      res.send("Home: GET /about, POST /file/append?text=hi, GET /file/read, DELETE /file/delete");
    } else {
      res.statusCode = 405;
      res.send("Method not allowed");
    }
  } else {
    if (pathname === "/about") {
      if (method === "GET") {
        res.statusCode = 200;
        res.send("Simple nested if/else server");
      } else {
        res.statusCode = 405;
        res.send("Method not allowed");
      }
    } else {
      if (pathname === "/file/append") {
        if (method === "POST") {
          fs.appendFile(dataFilePath, text + "\n", "utf8", (err) => {
            if (err) {
              res.statusCode = 500;
              res.send("Append failed");
              return;
            }
            res.statusCode = 200;
            res.send("Text appended");
          });
        } else {
          res.statusCode = 405;
          res.send("Use POST");
        }
      } else {
        if (pathname === "/file/read") {
          if (method === "GET") {
            fs.readFile(dataFilePath, "utf8", (err, data) => {
              if (err) {
                res.statusCode = 404;
                res.send("File not found");
                return;
              }
              res.statusCode = 200;
              res.send(data || "File is empty");
            });
          } else {
            res.statusCode = 405;
            res.send("Use GET");
          }
        } else {
          if (pathname === "/file/delete") {
            if (method === "DELETE") {
              fs.unlink(dataFilePath, (err) => {
                if (err) {
                  res.statusCode = 404;
                  res.send("File not found");
                  return;
                }
                res.statusCode = 200;
                res.send("File deleted");
              });
            } else {
              res.statusCode = 405;
              res.send("Use DELETE");
            }
          } else {
            res.statusCode = 404;
            res.send("Route not found");
          }
        }
      }
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
