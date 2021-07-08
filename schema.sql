CREATE SCHEMA IF NOT EXISTS fish;

DROP TABLE IF EXISTS leaderboard;
CREATE TABLE leaderboard(
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50),
  score INTEGER
);

CREATE INDEX ON leaderboard (score);
