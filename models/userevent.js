module.exports = (sequelize, DataTypes) => {
  const UserEvent = sequelize.define(
    'UserEvent',
    {
      user_id: DataTypes.INTEGER,
      event_id: DataTypes.INTEGER,
    },
    {
      tableName: 'users_events',
      underscored: true,
    }
  )

  UserEvent.associate = function (models) {
    UserEvent.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    })
    UserEvent.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'event',
    })
  }

  return UserEvent
}
