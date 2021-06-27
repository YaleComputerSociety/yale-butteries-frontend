'use strict'
import Model from 'sequelize'

module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Position.hasMany(models.EventType)
      Position.hasMany(models.User)
    }
  }
  Position.init(
    {
      position: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Position',
      tableName: 'positions',
    }
  )
  return Position
}
