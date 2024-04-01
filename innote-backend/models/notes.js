'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{ foreignKey: 'user_id' });
      this.belongsToMany(models.Tags, { through: 'note_tags', foreignKey: 'note_id' });
      

    }
  }
  Notes.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
      unique: true
    },
    title: DataTypes.STRING,
    contents: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'notes',
  });
  return Notes;
};