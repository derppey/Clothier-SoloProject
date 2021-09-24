'use strict';

const fs = require('fs/promises');
const db = require('../models/index');
const fetchReq = require('./zapposDBmethods')

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
          attributes: ['title']
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
    ctx.status = 200;
  } catch (err) {
    ctx.body = err;
    ctx.status = 500;
  }
};

exports.postUsers = async ctx => {
  const body = ctx.request.body;
  try {
    await body.forEach(user => {
      db.users.create({
        firstName: user.name.firstname,
        lastName: user.name.lastname,
        username: user.username,
        email: user.email,
        password: user.password,
        })
      })
    ctx.status = 201;
  } catch (err) {
    ctx.body = err;
    ctx.status = 500;
  }
};

//Item Methods
exports.getItems = async function (ctx) {
  try {
    ctx.body = await db.items.findAll({
      attributes: ['title', 'category', 'price', 'image', 'primaryKey', 'createdAt']
    }); 
    ctx.status = 200;
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
    const toFollowUser = await db.users.findOne({where: {primaryKey: body.toFollowUserId}})
    currentUser.addUser(toFollowUser);
    ctx.status = 201;
    return currentUser.getUser()
  } catch (err) {
    ctx.body = err;
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

//-----------------------

const { zapposProductList } = require('../tempDb')
const results = zapposProductList.results;
var axios = require("axios").default;
let resultsFiltered;

exports.zapposFilter = async () => {
  console.log('starting filter');
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