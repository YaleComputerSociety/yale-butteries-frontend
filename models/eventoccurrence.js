'use strict'

import Model from 'sequelize'

module.exports = (sequelize, DataTypes) => {
  class EventOccurrence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EventOccurrence.belongsTo(models.Event)
    }
  }
  EventOccurrence.init(
    {
      date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'EventOccurrence',
      tableName: 'event_occurrences',
      underscored: true,
    }
  )
  return EventOccurrence
}
