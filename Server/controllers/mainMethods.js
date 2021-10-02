'use strict';

const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;


//User Methods
exports.getUsers = async function (ctx) {
  try {
    ctx.body = await db.users.findAll({
      include: [
        {
        model: db.ADQ,
        attributes: ['itemPrimaryKey'],
        include: {
          model: db.items,
          attributes: ['title', 'category', 'brand', 'image', 'productId', 'productUrl', 'primaryKey']
          },
        }
      ],
      attributes: ['firstName', 'lastName', 'primaryKey', 'username']
    }); 
    ctx.status = 200;
  } catch (err) {
    ctx.body = err;
    ctx.status = 500;
  }
};

exports.postUsers = async ctx => {
  const user = ctx.request.body;
  try {
    await db.users.create({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password,
      })
    ctx.status = 201;
    ctx.body = await db.users.findOne({
      where: {email: user.email},
      attributes: ['primaryKey']
    })
  } catch (err) {
    ctx.body = err;
    ctx.status = 500;
  }
};

//User Methods
exports.getUserById = async function (id) {
  try {
    return await db.users.findOne({
      where: { primaryKey: id},
      include: [
        {
        model: db.ADQ,
        attributes: ['itemPrimaryKey'],
        include: {
          model: db.items,
          attributes: ['title', 'category', 'brand', 'image', 'productId', 'productUrl', 'primaryKey']
        }
      },
      {
        model: db.Follows,
        attributes: ['userPrimaryKey'],
        include: {
          model: db.users,
          attributes: ['firstName', 'lastName']
        }
      }
    ],
      attributes: ['firstName', 'lastName', 'primaryKey']
    }); 
  } catch (err) {
    return null;
  }
};

exports.profile = async (ctx) => {
  try {
    const user = ctx.request.user;
    ctx.status = 200;
    ctx.body = user;
  } catch {
    ctx.status = 404
    ctx.body = {error: 404, message: 'Resource not found' };
  }
};

//Item Methods
exports.getItems = async function (ctx) {
  try {
    ctx.body = await db.items.findAll({
      attributes: ['title', 'category', 'brand', 'image', 'productId', 'productUrl', 'primaryKey', 'createdAt']
    }); 
    ctx.status = 200;
  } catch (err) {
    ctx.body = err;
    ctx.status = 500;
  }
};

exports.getOneItem = async function (ctx) {
  const id = ctx.request.body.ItemId;
  try {
    const body = await db.items.findOne({
      where: { primaryKey: id },
      attributes: ['title', 'category', 'brand', 'image', 'productId', 'productUrl', 'primaryKey', 'createdAt']
    }); 
    ctx.status = 200;
    ctx.body = body;
  } catch (err) {
    ctx.body = err;
    ctx.status = 500;
  }
};

exports.postItems = async ctx => {
  const body = ctx.request.body;
  try {
    await body.forEach(item => {
      db.items.create({
        title: item.title,
        category: item.category,
        price: item.price,
        image: item.image,
        })
      })
      ctx.status = 201;
  } catch (err) {
    ctx.body = err;
    ctx.status = 500;
  }
};

//ADQ Methods (creates relationship between a user and multiple items)
exports.getADQ = async function (ctx) {
  try {
    ctx.body = await db.ADQ.findAll(); 
    ctx.status = 200;
  } catch (err) {
    ctx.body = err;
    ctx.status = 500;
  }
};

exports.postADQ = async ctx => {
  const body = ctx.request.body;
  try {
    await db.ADQ.create({
        userPrimaryKey: body.UserId,
        itemPrimaryKey: body.ItemId,
      })
    ctx.status = 201;
  } catch (err) {
    ctx.body = err;
    ctx.status = 500;
  }
};

// Follow Users Method

exports.followUser = async ctx => {
  const body = ctx.request.body;
  try {
    const currentUser = await db.users.findOne({where: {primaryKey: body.currentUserId}})
    const profileUser = await db.users.findOne({where: {primaryKey: body.profileUser}})
    currentUser.addUser(profileUser);
    ctx.status = 201;
    return currentUser.getUser()
  } catch (err) {
    ctx.body.error = err;
    ctx.status = 500;
  }
};

exports.getFollows = async function (ctx) {
  try {
    ctx.body = await db.Follows.findAll()
    ctx.status = 200;
  } catch (err) {
    ctx.body = err;
    ctx.status = 500;
  }
};

//LogIn method
exports.login = async (ctx) => {
  const { email , password } = ctx.request.body;
  try {
    const user = await db.users.findOne({
      where: { email: email}});
    // const validatedPass = await bcrypt.compare(password, user.password);
    const validatedPass = (password === user.dataValues.password);
    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign({ _id: user.dataValues.primaryKey }, SECRET_KEY);
    ctx.status = 200
    ctx.body = { accessToken };
  } catch (error) {
    ctx.status = 401
    ctx.body = { error: '401', message: error };
  }
};

//The following code is just to get the items from Zappos Api in order to populate the DB

//const { zapposProductList } = require('../tempDb')
//const results = zapposProductList.results;
var axios = require("axios").default;
let resultsFiltered;

exports.zapposFilter = async () => {
  resultsFiltered = results.map((item, index) => {
    return {
      [index] : {
        brandName: item.brandName,
        productName: item.productName,
        productId: item.productId,
        productURL: item.productUrl,
      }
    }
  })

  let count = 0;
  
  const resultFunc = async () => {
    if (count > 99) return clearInterval(interval);
    console.log(count);
    let resItem = resultsFiltered[count][count];
    resultsFiltered[count][count] = {...resItem, ... await fetchReq(resItem.productId)}
    console.log(resultsFiltered[count][count]);
    return count++;
  }
  
  const interval = setInterval(resultFunc, 3000);

}
exports.postItemsZappo = async (ctx) => {
  const body = resultsFiltered;
  try {
    await body.forEach((item, index) => {
      db.items.create({
        title: item[index].productName,
        category: item[index].category,
        brand: item[index].brandName,
        image: item[index].imageUrl,
        productId: item[index].productId,
        productUrl: item[index].productURL
        })
      })
      ctx.status = 201;
  } catch (err) {
    ctx.body = err;
    ctx.status = 500;
  }
};