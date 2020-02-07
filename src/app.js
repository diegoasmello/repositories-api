const express = require("express");
const request = require("request");

const app = express();
const port = 3001;

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Backend is listening on ${port}`);
});
