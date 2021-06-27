'use strict'

import Model from 'sequelize'

module.exports = (sequelize, DataTypes) => {
  class AttendanceStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AttendanceStatus.hasMany(models.UsersEvent)
    }
  }
  AttendanceStatus.init(
    {
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'AttendanceStatus',
      tableName: 'attendance_statuses',
      underscored: true,
    }
  )
  return AttendanceStatus
}
