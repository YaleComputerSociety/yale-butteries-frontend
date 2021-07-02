module.exports = (sequelize, DataTypes) => {
  const Position = sequelize.define(
    'Position',
    {
      position: DataTypes.STRING,
    },
    {
      tableName: 'positions',
      underscored: true,
    }
  )

  Position.associate = function (models) {
    Position.hasMany(models.EventType, {
      foreignKey: 'position_id',
      as: 'eventTypes',
    })
    Position.hasMany(models.User, {
      foreignKey: 'position_id',
      as: 'users',
    })
  }

  return Position
}
