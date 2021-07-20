module.exports = (sequelize, DataTypes) => {
  const RoomRecurrenceType = sequelize.define(
    'RoomRecurrenceType',
    {
      room_id: DataTypes.INTEGER,
      recurrence_type_id: DataTypes.INTEGER,
    },
    {
      tableName: 'rooms_recurrence_types',
      underscored: true,
    }
  )

  RoomRecurrenceType.associate = function (models) {
    RoomRecurrenceType.belongsTo(models.Room, {
      foreignKey: 'room_id',
      as: 'room',
    })
    RoomRecurrenceType.belongsTo(models.RecurrenceType, {
      foreignKey: 'recurrence_type_id',
      as: 'recurrence_type',
    })
  }

  return RoomRecurrenceType
}
