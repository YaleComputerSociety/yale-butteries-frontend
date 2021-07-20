module.exports = (sequelize, DataTypes) => {
  const EventOccurrence = sequelize.define(
    'EventOccurrence',
    {
      event_id: DataTypes.INTEGER,
      description: DataTypes.STRING,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
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

    EventOccurrence.belongsToMany(models.User, {
      through: 'users_event_occurrences',
      foreignKey: 'event_occurrence_id',
      as: 'users',
    })
  }

  return EventOccurrence
}
