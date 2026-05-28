const express = require("express");
const app = express();

app.use(express.json());

const chattingHistory = {};

app.get("/chat", async (req, res) => {
  const { id, msg } = req.body;
  if (!chattingHistory[id]) {
    chattingHistory = [];
  }
  const History = chattingHistory[id];
  const prompt = [
    ...History,
    {
      role: "user",
      parts: [{ text: msg }],
    },
  ];
  const answer = await main(prompt);
  History.push({ role: "user", parts: [{ text: msg }] });
  History.push({ role: "model", parts: [{ text: answer }] });
  res.send(answer);
});

app.listen(process.env.port, () => {
  console.log("server is running");
});
