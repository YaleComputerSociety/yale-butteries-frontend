'use strict'

import Model from 'sequelize'

module.exports = (sequelize, DataTypes) => {
  class UsersEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UsersEvent.belongsTo(models.User)
      UsersEvent.belongsTo(models.Event)
      UsersEvent.belongsTo(models.AttendanceStatus)
      UsersEvent.belongsTo(models.Relationship)
    }
  }
  UsersEvent.init(
    {
      user_id: DataTypes.INTEGER,
      event_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UsersEvent',
      tableName: 'users_events',
      underscored: true,
    }
  )
  return UsersEvent
}
