const express = require("express");
const axios = require("axios");

const app = express();
const port = 3001;

const API_URL = "https://api.github.com";

const config = {
  headers: {
    Authorization: process.env.GITHUB_TOKEN,
  },
};

app.all("*", (_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/search/:term", (req, res, next) => {
  axios
    .get(`${API_URL}/search/repositories?q=${req.params.term}`, config)
    .then((response) => {
      res.status(200).send({ status: true, data: response.data });
      next();
    })
    .catch((err) => {
      res.status(500).send({ status: false, data: err.message });
      next();
    });
});

app.get("/repository/:user/:repo", (req, res, next) => {
  axios
    .all([
      axios.get(
        `${API_URL}/repos/${req.params.user}/${req.params.repo}`,
        config
      ),
      axios.get(`${API_URL}/users/${req.params.user}/repos`, config),
    ])
    .then(
      axios.spread((res1, res2) => {
        const data = {
          respository: res1.data,
          repositoriesFromAuthor: res2.data,
        };
        res.status(200).send({ status: true, data: data });
        next();
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: false, data: err.message });
      next();
    });
});

/* github api authentication */
app.get("/callback", (req, res, next) => {
  const { query } = req;
  const { code } = query;

  if (!code) {
    res.status(200).send({ status: false, data: "No code" });
  }

  axios
    .post("https://github.com/login/oauth/access_token", {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: code,
    })
    .then((response) => {
      res.status(200).send({ status: true, data: response.data });
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: false, data: err.message });
      next();
    });
});

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Backend is listening on ${port}`);
});
