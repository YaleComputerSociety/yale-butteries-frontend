'use strict'
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    'Event',
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      event_type_id: DataTypes.INTEGER,
      room_id: DataTypes.INTEGER,
      recurrence_type_id: DataTypes.INTEGER,
      approval_status_id: DataTypes.INTEGER,
    },
    {
      tableName: 'events',
      underscored: true,
    }
  )

  Event.associate = function (models) {
    Event.belongsTo(models.EventType, {
      foreignKey: 'event_type_id',
      as: 'eventType',
    })
    Event.belongsTo(models.Room, {
      foreignKey: 'room_id',
      as: 'room',
    })
    Event.belongsTo(models.RecurrenceType, {
      foreignKey: 'recurrence_type_id',
      as: 'recurrenceType',
    })
    Event.belongsTo(models.ApprovalStatus, {
      foreignKey: 'approval_status_id',
      as: 'approvalStatus',
    })
    Event.hasMany(models.EventOccurrence, {
      foreignKey: 'event_id',
      as: 'eventOccurrences',
    })

    Event.belongsToMany(models.User, { through: 'users_events', foreignKey: 'event_id', as: 'users' })
  }

  return Event
}
