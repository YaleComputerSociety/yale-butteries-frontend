'use strict'
import Model from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.College)
      Room.belongsTo(models.RecurrenceType)
      Room.hasMany(models.Event)
    }
  }
  Room.init(
    {
      room_name: DataTypes.STRING,
      needs_approval: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Room',
      tableName: 'rooms',
      underscored: true,
    }
  )
  return Room
}
