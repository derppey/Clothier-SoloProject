// REMOVE-START
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const db = require('../models/index');
const mainMethods = require('../controllers/mainMethods');


// REMOVE-END

const authMiddleware = async (ctx, next) => {
  const authHeaders = ctx.request.headers['authorization'];
  if (!authHeaders) return ctx.status = 403;
  const token = authHeaders.split(' ')[1];
  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await mainMethods.getUserById(_id);
    if (!user) return ctx.status = 401;
    ctx.request.user = user;
    next();
  } catch (error) {
    ctx.status = 401;
  }
  // REMOVE-END
};

module.exports = authMiddleware;
