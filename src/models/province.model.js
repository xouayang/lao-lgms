const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const Province = sequelize.define(
  "province",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    province_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at : {
        type:DataTypes.DATE,
        defaultValue:sequelize.literal("NOW()")
    }
  },
  {
    sequelize,
  }
);

module.exports = Province;
