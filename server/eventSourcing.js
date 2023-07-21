const express = require("express");
const events = require("events");

const cors = require("cors");

const PORT = 4000;

const emitter = new events.EventEmitter();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/connect", (req, res) => {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cashe",
  });
  emitter.on("newMessage", (message) => {
    res.write(`data: ${JSON.stringify(message)} \n\n`);
  });
});

app.post("/new-message", (req, res) => {
  const message = req.body;
  emitter.emit("newMessage", message);
  res.status(200);
});

app.listen(PORT, () => {
  console.log(`work on port ${PORT}`);
});
