const express = require("express");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.json({ Hello: "world" });
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`I'm running at port ${PORT}`);
});
