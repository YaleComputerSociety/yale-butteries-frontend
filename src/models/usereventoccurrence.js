module.exports = (sequelize, DataTypes) => {
  const UserEventOccurrence = sequelize.define(
    'UserEventOccurrence',
    {
      user_id: DataTypes.INTEGER,
      event_occurrence_id: DataTypes.INTEGER,
      attendance_status_id: DataTypes.INTEGER,
    },
    {
      tableName: 'users_event_occurrences',
      underscored: true,
    }
  )

  UserEventOccurrence.associate = function (models) {
    UserEventOccurrence.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    })
    UserEventOccurrence.belongsTo(models.EventOccurrence, {
      foreignKey: 'event_occurrence_id',
      as: 'eventOccurrence',
    })
    UserEventOccurrence.belongsTo(models.AttendanceStatus, {
      foreignKey: 'attendance_status_id',
      as: 'attendanceStatus',
    })
  }

  return UserEventOccurrence
}
