export {};
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const mainMethods = require('../controllers/mainMethods');



const authMiddleware = async (ctx:any, next:any) => {
  const authHeaders = ctx.request.headers['authorization'];
  if (!authHeaders) return ctx.status = 403;
  const tokenType = authHeaders.split(' ')[0];
  const token = authHeaders.split(' ')[1];
  try {
    let id;
    if (tokenType === 'Bearer') id = jwt.verify(token, SECRET_KEY);
    if (tokenType === 'id') id = {_id: token};
    const _id = id._id;
    const user = await mainMethods.getUserById(_id);
    if (!user) return ctx.status = 401;
    ctx.request.user = user;
    next();
  } catch (error) {
    ctx.status = 401;
  }
};

module.exports = authMiddleware;
