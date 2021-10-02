'use strict';

const Router = require('koa-router');
const router = new Router();
const mainMethods = require('./controllers/mainMethods');
const authMiddleware = require('./middlewares/auth');

//Get all users
router.get('/users', mainMethods.getUsers); //DONE
//Get logged in user
router.get('/me', authMiddleware, mainMethods.profile); //DONE

//Register new User
router.post('/users', mainMethods.postUsers); //DONE

//Get all items
router.get('/items', mainMethods.getItems); 
//Register new items
router.post('/items', mainMethods.postItems); //NO LONGER NEEDED
//get One item
router.post('/OneItem', mainMethods.getOneItem);

//Get all adquisitions
router.get('/adq', mainMethods.getADQ);
// Register new adquisition
router.post('/adq', mainMethods.postADQ);

//Get all adquisitions
router.get('/follow', mainMethods.getFollows);
//New Follow
router.post('/follow', mainMethods.followUser);

//Zappos DB populator
router.get('/zappos', mainMethods.zapposFilter); //LEGACY
router.post('/zappos', mainMethods.postItemsZappo ); //LEGACY

//User Login Authenticaiton
router.post('/login', mainMethods.login); //DONE

module.exports = router;
