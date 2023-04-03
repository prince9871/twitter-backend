# Twitter Clone Project
This is a Twitter clone project built using Node.js, Express, and MongoDB. It allows users to create an account, follow and unfollow other users, and create and view tweets.

## Deployment Link
Test This Project With Check Deployments
https://twitter-backend-git-master-prince9871.vercel.app/

## Installation
Clone the repository
https://github.com/prince9871/twitter-backend.git

Install dependencies using 
- npm install
Start the server using 
- npm start 
 To start the server in development mode using nodemon

## Endpoints
The following endpoints are available:

### Authentication
####  POST: Register a new user -- /register
####  POST: Login with existing credentials --/login
####  POST: Reset password for an existing user -- /reset-password/:userId
### User
####  Get details of the logged in user, including the number of followers and following --/user GET:
####  Follow another user -- /user/follow POST:
#### DELETE: Unfollow a previously followed user -- /user/unfollow 
### Tweet
####  POST: Create a new tweet -- /tweets
####  GET: Get all tweets by the logged in user --/tweets/user
####  GET: Get all tweets by users the logged in user is following -- /tweets/followed
####  GET: Search for tweets based on a search query -- /tweets/search
####  GET: Get tweets with pagination -- /tweets/page
## Models
### The project uses two models: User and Tweet

### User
The User model has the following properties:

- username (string, required)
- email (string, required, unique)
- favorite_food (string, required)
- password (string, required)
- following (array of user IDs)
- followers (array of user IDs)
### Tweet
The Tweet model has the following properties:

- content (string, required)
- userId (user ID of the user who created the tweet)
- hashtags (array of strings)


## Dependencies
- bcrypt: ^5.1.0
- express: ^4.18.2
- joi: ^17.9.1
- jsonwebtoken: ^9.0.0
- mongoose: ^7.0.3
- nodemon: ^2.0.22
- Endpoints
- The following endpoints are available:


## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

