module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      netid: DataTypes.STRING,
      name: DataTypes.STRING,
      position_id: DataTypes.INTEGER,
      college_id: DataTypes.INTEGER,
    },
    {
      tableName: 'users',
      underscored: true,
    }
  )

  User.associate = function (models) {
    User.belongsTo(models.Position, {
      foreignKey: 'position_id',
      as: 'position',
    })
    User.belongsTo(models.College, {
      foreignKey: 'college_id',
      as: 'college',
    })
    User.hasMany(models.Stat, {
      foreignKey: 'user_id',
      as: 'stats',
    })
    User.belongsToMany(models.Event, { through: 'users_events', foreignKey: 'user_id', as: 'events' })
    User.belongsToMany(models.EventOccurrence, {
      through: 'users_event_occurrences',
      foreignKey: 'user_id',
      as: 'event_occurences',
    })
  }

  return User
}
