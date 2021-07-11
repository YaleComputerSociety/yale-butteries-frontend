module.exports = (sequelize, DataTypes) => {
  const UserEventOccurrence = sequelize.define(
    'UserEventOccurrence',
    {
      user_id: DataTypes.INTEGER,
      event_Occurrence_id: DataTypes.INTEGER,
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
    UserEventOccurrence.belongsTo(models.Event, {
      foreignKey: 'event_occurrence_id',
      as: 'event',
    })
    UserEventOccurrence.belongsTo(models.AttendanceStatus, {
      foreignKey: 'attendance_status_id',
      as: 'attendanceStatus',
    })
  }

  return UserEventOccurrence
}
