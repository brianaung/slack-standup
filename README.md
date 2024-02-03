# Slack Standup

A webapp integrated with Slack to streamline the daily standup process.

> Stack: React (Vite), Graphql, Nest.js, Postgres (TypeORM)

## Features
- View daily messages real-time.
- Keep track of edited message history.
- Filter messages across teams.
- Assign members to different groups using drag-and-drop ui.

wip

## Screenshots
wip

## Running the app

### Prerequisites
- Install [Docker](https://docs.docker.com/).
- [Join](https://join.slack.com/t/myworkspace-s9d5002/shared_invite/zt-2bvwt0h6u-LWh7pBvzj35TpCrIll2GSw) the Slack channel.

### Steps
You can pull the docker images from this [repository](https://hub.docker.com/r/brianaung16/slack-standup).
1. Pull all images.
```
docker pull --all-tags brianaung16/slack-standup
```

2. Build and start the containers using docker compose.
```
docker compose up -d
```

3. Run database migration if you are running for the first time.
Enter the server shell.
```
docker exec -t -i slack-standup-server-1 sh
```

Run migrations.
```
npm run migration:run
```

`Ctrl-D` to exit.

Then run `docker compose stop` and `docker compose start` again.

> Note: I will add the migration step in the compose script when I got time.

4. Try sending some messages on Slack in `standup-board` channel and view the app at `localhost:3000`.
