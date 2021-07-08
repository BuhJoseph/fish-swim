const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const Pool = require('pg').Pool;

const dbconfig = require('./config.js').db;
const pool = new Pool(dbconfig);

const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

app.get('/leaderboard', (req, res) => {
  var leaderboardQuery = 'SELECT name, score FROM leaderboard ORDER BY score DESC LIMIT 10';
  pool.query(leaderboardQuery)
    .then(results => {
      res.end(JSON.stringify(results.rows));
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/leaderboard', (req, res) => {
  var query = `INSERT INTO leaderboard (name, score) VALUES ('${req.body.name}', ${req.body.score}) RETURNING id`;
  pool.query(query)
    .then(result => {
      var data = {};

      var queries = [];
      var positionQuery = `SELECT position FROM (SELECT id, ROW_NUMBER() OVER(ORDER BY score DESC) AS position FROM leaderboard) AS x WHERE id=${result.rows[0].id}`;
      queries.push(
        pool.query(positionQuery)
          .then(position => {
            data.position = position.rows[0].position;
          })
      );

      var leaderboardQuery = 'SELECT name, score FROM leaderboard ORDER BY score DESC LIMIT 10';
      queries.push(
        pool.query(leaderboardQuery)
          .then(leaderboard => {
            data.leaderboard = leaderboard.rows;
          })
      );

      Promise.all(queries)
        .then(() => {
          res.end(JSON.stringify(data));
        });
    })
    .catch(err => {
      console.log(err);
    });
});


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
