'use strict'

import Model from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Position)
      User.belongsTo(models.College)
      User.hasMany(models.Stat)
      User.belongsToMany(models.Event, { through: 'users_events' })
    }
  }

  User.init(
    {
      netid: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    }
  )
  return User
}
