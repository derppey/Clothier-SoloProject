
module.exports = (sequelize, DataTypes) => {
  const items = sequelize.define('items', {
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    brand: DataTypes.STRING,
    image: DataTypes.STRING,
    productId: DataTypes.STRING,
    productUrl: DataTypes.STRING,
    primaryKey: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });
  return items; 
};
