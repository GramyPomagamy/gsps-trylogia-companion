import { readFileSync, watch } from "fs";
import { Server } from "socket.io";

import { loadConfig } from "./helpers";

const config = loadConfig();

function sendCompletion(): string {
  return readFileSync(config.completionFile, "utf8")
    .slice(21)
    .replace(/\s+/g, "");
}

const io = new Server(config.port);

io.on("connection", (socket) => {
  console.log("Client connected.");
  socket.emit("completion", sendCompletion());

  watch(config.completionFile, () => {
    try {
      socket.emit("completion", sendCompletion());
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected.");
  });
});

process.on("SIGINT", () => {
  console.log("\nShutting down server...");
  void io.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});