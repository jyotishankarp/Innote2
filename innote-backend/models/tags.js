'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Notes, { through: 'note_tags', foreignKey: 'tag_id' });

    }
  }
  Tags.init({
    tag_id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
      unique: true
    },
    tagname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tags',
  });
  return Tags;
};