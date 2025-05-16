import express from "express";
import routes from "./routes/index.js";
import db from "./db/connection.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routes);

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
