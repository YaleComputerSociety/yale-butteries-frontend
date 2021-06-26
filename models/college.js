'use strict'

import Model from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class College extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      College.hasMany(models.User)
      College.hasMany(models.ImGame)
      College.hasMany(models.Room)
    }
  }
  College.init(
    {
      college: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'College',
      tableName: 'colleges',
    }
  )
  return College
}
