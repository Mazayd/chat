# chat

## Build Steps

To get started with the project, follow these build steps:

1. Install dependencies with `npm install`.
2. Create a .env file based on the .example.env file and fill in the required values.
3. Start the server using `npm run start`.

To wrap the application in a Docker container, follow these build steps:

1. Execute the command `sudo docker-compose up`.
2. You can access the application container using the URL `ws://172.18.0.3:5000/` or `ws://172.18.0.2:5000/`.
3. To stop the containers in the terminal where you executed the command from the first step, press the key combination `ctrl + c`.
4. To remove the containers, use the command: `sudo docker rm chat_app_1 chat_db_1`.
5. To delete images, first ensure there are no containers created from these images. If there are, execute the previous step, then apply the command: `sudo docker image rm postgres chat_app`.
