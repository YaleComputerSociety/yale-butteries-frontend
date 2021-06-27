'use strict'

import Model from 'sequelize'

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.EventType)
      Event.belongsTo(models.Room)
      Event.belongsTo(models.RecurrenceType)
      Event.hasMany(models.EventOccurence)

      Event.belongsToMany(models.User, { through: 'users_events' })
    }
  }
  Event.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      approved: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Event',
      tableName: 'events',
      underscored: true,
    }
  )
  return Event
}
