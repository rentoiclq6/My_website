import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.cwd(), "dist");
const port = Number(process.env.PORT || 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
};

const server = createServer((req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "127.0.0.1"}`);
    const requested = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
    let filePath = resolve(join(root, requested));

    if (!filePath.startsWith(root) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
      filePath = join(root, "index.html");
    }

    res.setHeader("Content-Type", types[extname(filePath)] || "application/octet-stream");

    if (req.method === "HEAD") {
      res.statusCode = 200;
      res.end();
      return;
    }

    const stream = createReadStream(filePath);
    stream.on("error", (error) => {
      console.error(error);
      if (!res.headersSent) {
        res.statusCode = 500;
      }
      res.end("Server error");
    });
    stream.pipe(res);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end("Server error");
  }
});

server.on("error", (error) => {
  console.error(error);
  process.exitCode = 1;
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Portfolio preview: http://127.0.0.1:${port}`);
});
