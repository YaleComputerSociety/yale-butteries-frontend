module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    'Room',
    {
      room_name: DataTypes.STRING,
      needs_approval: DataTypes.BOOLEAN,
      college_id: DataTypes.INTEGER,
      recurrence_type_id: DataTypes.INTEGER,
    },
    {
      tableName: 'rooms',
      underscored: true,
    }
  )

  Room.associate = function (models) {
    Room.belongsTo(models.College, {
      foreignKey: 'college_id',
      as: 'college',
    })
    Room.belongsTo(models.RecurrenceType, {
      foreignKey: 'recurrence_type_id',
      as: 'recurrenceType',
    })
    Room.hasMany(models.Event, {
      foreignKey: 'room_id',
      as: 'events',
    })
  }

  return Room
}
