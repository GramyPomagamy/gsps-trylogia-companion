const config = require("./config.json");
const fs = require("fs");

function sendCompletion() {
  return fs
    .readFileSync(config.completionFile, "utf8")
    .slice("21")
    .replace(/\s+/g, "");
}

const io = require("socket.io")(config.port);

io.on("connection", (socket) => {
  console.log("Client connected.");
  socket.emit("completion", sendCompletion());

  fs.watch(config.completionFile, () => {
    try {
      socket.emit("completion", sendCompletion());
    } catch (err) {
      console.log(err);
    }
  });
});

io.on("disconnect", function close() {
  console.log("Client disconnected.");
});
