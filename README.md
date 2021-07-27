

# Fish Swim

This is a 2D side scroller game where you play as a fish and dodge the incoming mines. This was built using purely React and CSS in about 2 days.


## Demo



  
## Features

- Randomly generated obstacles
- Automatic speed increase as you play
- Infinite background scroll
- Online Leaderboard

  
## Screenshots
<img width="1680" alt="Screen Shot 2021-07-26 at 6 04 46 PM" src="https://user-images.githubusercontent.com/22485685/127078986-034ba9da-47a1-46e2-a8f2-e428e7c17c01.png">
<img width="1680" alt="Screen Shot 2021-07-26 at 6 06 45 PM" src="https://user-images.githubusercontent.com/22485685/127078991-330c8391-a33c-4ad4-a4b8-111c3012bb43.png">


  
## Run Locally

Clone the project

```bash
  git clone git@github.com:BuhJoseph/fish-swim.git
```

Go to the project directory

```bash
  cd fish-swim
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
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
