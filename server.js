const express = require('express');
const app = express();
const etl = require('./src/etl');

const port = 8080;
const category = etl.category.map(c => c.toLowerCase().split(" ").join('_'));
app.get(`/:category(${category.join('|')})`, async (req, res, next) => {
  try {
    let param = etl.category[category.indexOf(req.params.category)];
    let data = await etl.count(param).catch((err) => { throw err });
    res.setHeader("Content-Type", "application/json");
    res.status(200).send({ result: data });
  } catch (err) {
    console.log(err)
    res.status(500).send(err.toString());
  }
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port);
console.log("Listening on port " + port);

module.exports = app;