module.exports = (sequelize, DataTypes) => {
  const UsersEvent = sequelize.define(
    'UsersEvent',
    {
      user_id: DataTypes.INTEGER,
      event_id: DataTypes.INTEGER,
      attendance_status_id: DataTypes.INTEGER,
      relationship_id: DataTypes.INTEGER,
    },
    {
      tableName: 'users_events',
      underscored: true,
    }
  )

  UsersEvent.associate = function (models) {
    UsersEvent.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    })
    UsersEvent.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'event',
    })
    UsersEvent.belongsTo(models.AttendanceStatus, {
      foreignKey: 'attendance_status_id',
      as: 'attendance_status',
    })
    UsersEvent.belongsTo(models.Relationship, {
      foreignKey: 'relationship_id',
      as: 'relationship',
    })
  }

  return UsersEvent
}
