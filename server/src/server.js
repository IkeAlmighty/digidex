import express from "express";
import routes from "./routes/index.js";
import db from "./db/connection.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";
import helmet from "helmet";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3001;

// let stripe through CSP:
const csp = {
  "default-src": ["'self'"],
  "script-src": ["'self'", "https://js.stripe.com"],
  "connect-src": [
    "'self'",
    "https://api.stripe.com",
    "https://m.stripe.network",
  ],
  "frame-src": ["'self'", "https://js.stripe.com"],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "data:", "https://*.stripe.com"],
  "font-src": ["'self'", "data:"],
  "frame-ancestors": ["'self'"],
};

if (process.env.NODE_ENV !== "production") {
  csp["script-src"].push("'unsafe-eval'", "http://localhost:5173");
  csp["connect-src"].push("http://localhost:5173", "ws://localhost:5173");
}

app.use((_req, res, next) => {
  res.removeHeader("Content-Security-Policy");
  next();
});

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: csp,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from client/dist
app.use(express.static(path.join(__dirname, "../../client", "dist")));

// For any route not handled by API, send index.html
app.get(/^\/(?!api).*/, (_req, res) => {
  res.sendFile(path.join(__dirname, "../../client", "dist", "index.html"));
});

// api routes:
app.use("/api", routes);

db.once("open", () => {
  console.log("\n\nConnected to database...");

  if (process.env.NODE_ENV !== "test") {
    const server = app.listen(PORT, async () => {
      const address = server.address();
      if (typeof address === "string") {
        console.log(`Express server listening on ${address}\n\n`);
      } else if (address && typeof address === "object") {
        const host = address.address === "::" ? "localhost" : address.address;
        console.log(
          `Express server listening on http://${host}:${address.port}\n\n`
        );
      }
    });
  }
});

// for testing:
export default app;
