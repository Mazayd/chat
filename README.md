# chat

## Build Steps

To get started with the project, follow these build steps:

1. Install dependencies with `npm install`.
2. Create a .env file based on the .example.env file and fill in the required values.
3. Start the server using `npm run start`.

To wrap the application in a Docker container, follow these build steps:

1. Execute the command `sudo docker-compose up`.
2. After the containers are running, use the command `sudo docker exec -it chat_app_1 /bin/bash` to enter inside the container.
3. Inside the container, use the command `npx knex migrate:latest` to apply migrations.
4. Points 2 and 3 need to be executed only once during the initial build.
5. You can access the application container using the URL `ws://172.18.0.3:5000/` or `ws://172.18.0.2:5000/`.
