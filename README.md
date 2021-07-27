
# Fish Swim

This is a 2D side scroller game where you play as a fish and dodge the incoming mines. This was built using purely React and CSS in about 2 days.


## Demo

Insert gif or link to demo

  
## Features

- Randomly generated obstacles
- Automatic speed increase as you play
- Infinite background scroll
- Online Leaderboard

  
## Screenshots


  
## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Setup postgres database
```bash
  Connect to postgres server
  Create fishswim database
```

Create postgres schema
```bash
  Run \i schema.sql
```

Create config.js file in server directory. Copy config.example.js and replace with database information
```bash
  module.exports = {
    db: {
      user: 'USER',
      host: 'HOST',
      database: 'DATABASE NAME',
      password: 'PASSWORD',
      port: 5432
    }
  }
```
