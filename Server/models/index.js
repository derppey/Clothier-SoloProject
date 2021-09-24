const fs = require('fs');
const path = require('path');
const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');
const {DataTypes} = require('sequelize');
  
const config = {
  host: 'Localhost',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000, 
  },
  operatorsAliases: 0 
};

const sequelize = new Sequelize('postgres', 'postgres', 'admin', config);
const db = {};

const files = fs.readdirSync(__dirname);

for (const file of files) {
  if (file !== 'index.js' && file !== 'db.js') {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }
}

for (const model in db) {
  if (db[model].associate) db[model].associate(db);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Users to ADQ Association (1 to many)
db.users.hasMany(db.ADQ, {
  foreignKey: {
    name: 'userPrimaryKey',
    type: DataTypes.INTEGER,
    allowNull: false 
  }
});
db.ADQ.belongsTo(db.users);

//Items to ADQ Association (1 to many)
db.items.hasMany(db.ADQ, {
  foreignKey: {
    name: 'itemPrimaryKey',
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
db.ADQ.belongsTo(db.items);

//Follow: many 2 many association
db.users.belongsToMany(db.users, {as: "User", foreignKey: "userPrimaryKey", through: "Follows"})
db.users.belongsToMany(db.users, {as: "Followed", foreignKey: "FollowedId", through: "Follows"})


//Relationship w/ Follow>
db.users.hasMany(db.Follows, {
  foreignKey: {
    name: 'userPrimaryKey',
    type: DataTypes.INTEGER,
    allowNull: false 
  }
});
db.Follows.belongsTo(db.users);

db.users.hasMany(db.Follows, {
  foreignKey: {
    name: 'FollowedId',
    type: DataTypes.INTEGER,
    allowNull: false 
  }
});
db.Follows.belongsTo(db.users);


module.exports = db;
