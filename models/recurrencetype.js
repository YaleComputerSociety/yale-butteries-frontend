'use strict'
import Model from 'sequelize'

module.exports = (sequelize, DataTypes) => {
  class RecurrenceType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RecurrenceType.hasMany(models.Event)
      RecurrenceType.hasMany(models.Room)
    }
  }
  RecurrenceType.init(
    {
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'RecurrenceType',
      tableName: 'recurrence_types',
      underscored: true,
    }
  )
  return RecurrenceType
}
