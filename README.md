# Real-Time Chat Application
# Description
This project is a real-time chat application developed using Node.js, Socket.io, and MySQL database. It allows users to communicate in real-time, send and receive messages, and indicates when other users are typing. The application also features user authentication, password validation during registration, and persistence of chat history across sessions.

# Features
* User registration and authentication
* Password validation with specific criteria
* Real-time messaging with Socket.io
* Typing status indication
* Persistent chat history stored in MySQL database

# Installation
1 Clone the repository: git clone <https://github.com/JyotiPratap/chatApplication>
2 Install dependencies: npm install
3 Set up environment variables:

* DB_USER: MySQL database username
* DB_PASS: MySQL database password
* DB_NAME: MySQL database name
* DB_HOST: MySQL database host
* JWT_SECRET: Secret key for JWT token generation
* PORT: Port number for the server

4 Run the server: npx nodemon index.js

# Usage
* Register a new account using the /register endpoint.
* Log in with your credentials using the /login endpoint.
* Send messages to other users using the /send-message endpoint.
* Retrieve chat history using the /history endpoint.
* Update typing status using the /typing endpoint.

# Contact
* jyotiprataptiwarijee1@gmail.com  
* Jyoti Pratap Tiwari 