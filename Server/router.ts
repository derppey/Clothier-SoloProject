'use strict';

const Router = require('koa-router')();
const mainMethods = require('./controllers/mainMethods');
const authMiddleware = require('./middlewares/auth');

//Get all users
Router.get('/users', mainMethods.getUsers);
//Get logged in user
Router.get('/me', authMiddleware, mainMethods.profile);

//Register new User
Router.post('/users', mainMethods.postUsers);

//Get all items
Router.get('/items', mainMethods.getItems);
//Register new items
Router.post('/items', mainMethods.postItems);
//get One item
Router.post('/OneItem', mainMethods.getOneItem);

//Get all adquisitions
Router.get('/adq', mainMethods.getADQ);
// Register new adquisition
Router.post('/adq', mainMethods.postADQ);

//Get all adquisitions
Router.get('/follow', mainMethods.getFollows);
//New Follow
Router.post('/follow', mainMethods.followUser);

//Zappos DB populator
Router.get('/zappos', mainMethods.zapposFilter);
Router.post('/zappos', mainMethods.postItemsZappo );

//User Login Authenticaiton
Router.post('/login', mainMethods.login);

module.exports = Router;
