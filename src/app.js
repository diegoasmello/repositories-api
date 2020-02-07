const express = require("express");
const request = require("request");

const app = express();
const port = 3001;

const API_URL = "https://api.github.com";

app.all("*", (_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/search/:term", (req, res, next) => {
  const options = {
    url: `${API_URL}/search/repositories?q=${req.params.term}`,
    headers: {
      "User-Agent": "request",
    },
  };

  request.get(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.status(200).send({ status: true, data: JSON.parse(body) });
      next();
    } else {
      res.status(200).send({ status: false, data: "" });
      next();
    }
  });
});

app.get("/repository/:user/:repo", (req, res, next) => {
  try {
    const options = {
      url: `${API_URL}/users/${req.params.user}/repos`,
      headers: {
        "User-Agent": "request",
      },
    };

    request.get(options, (error, response, body) => {
      if (error && response.statusCode != 200) {
        return;
      }

      res.status(200).send({ status: true, data: JSON.parse(body) });
      next();
    });
  } catch (e) {
    res.status(500).send({ status: false, data: e.message });
    next();
  }
});

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Backend is listening on ${port}`);
});
