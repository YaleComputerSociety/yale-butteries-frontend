module.exports = (sequelize, DataTypes) => {
  const AttendanceStatus = sequelize.define(
    'AttendanceStatus',
    {
      status: DataTypes.STRING,
    },
    {
      tableName: 'attendance_statuses',
      underscored: true,
    }
  )

  AttendanceStatus.associate = function (models) {
    AttendanceStatus.hasMany(models.UsersEvent, {
      foreignKey: 'attendance_status_id',
      as: 'usersEvents',
    })
  }

  return AttendanceStatus
}
