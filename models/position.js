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
    Position.hasMany(models.User, {
      foreignKey: 'position_id',
      as: 'users',
    })
    Position.belongsToMany(models.EventType, {
      through: 'positions_event_types',
      foreignKey: 'position_id',
      as: 'eventTypes',
    })
  }

  return Position
}
