const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");
const { getImgUrl } = require("../middleware/firebase.middleware");

const Products = sequelize.define(
  "products",
  {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Products.afterFind(async (data) => {
  if (data.dataValues) {
    const img = await getImgUrl(data.image);
    data.image = img;
    return;
  }
  const urls = data.map(async (item) => {
    const img = await getImgUrl(item.image);
    item.image = img;
  });
  await Promise.all(urls); // map async
  return data;
});

module.exports = Products;
