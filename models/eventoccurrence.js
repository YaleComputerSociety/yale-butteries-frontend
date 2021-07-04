module.exports = (sequelize, DataTypes) => {
  const EventOccurrence = sequelize.define(
    'EventOccurrence',
    {
      date: DataTypes.DATEONLY,
      event_id: DataTypes.INTEGER,
    },
    {
      tableName: 'event_occurrences',
      underscored: true,
    }
  )

  EventOccurrence.associate = function (models) {
    EventOccurrence.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'event',
    })
  }

  return EventOccurrence
}
