'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class msgs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  msgs.init({
    msg_id: {
      allowNull: false,
      autoIncrement: true, 
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    msg: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    user_id: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    room_num: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'msgs',
    freezeTableName: true,
    timestamps: false
  });
  return msgs;
};