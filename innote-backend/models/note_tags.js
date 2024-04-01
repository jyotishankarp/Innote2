'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NoteTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NoteTags.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'note_tags',
  });
  return NoteTags;
};