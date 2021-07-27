

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
<img width="240" alt="Screen_Shot_2021-07-23_at_11 14 18_AM" src="https://user-images.githubusercontent.com/22485685/127078898-3141f4a1-c9de-4b70-bfd3-af82a3c74e99.png">
![Screen Shot 2021-07-23 at 4 59 48 PM](https://user-images.githubusercontent.com/22485685/127078914-e6ea4dff-4fc4-4265-84f3-c80c2ab94673.png)


  
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
