module.exports = (sequelize, DataTypes) => {
  const EventType = sequelize.define(
    'EventType',
    {
      type: DataTypes.STRING,
      position_id: DataTypes.INTEGER,
    },
    {
      tableName: 'event_types',
      underscored: true,
    }
  )

  EventType.associate = function (models) {
    EventType.hasMany(models.Event, {
      foreignKey: 'event_type_id',
      as: 'events',
    })
    EventType.belongsToMany(models.Position, {
      through: 'positions_event_types',
      foreignKey: 'event_type_id',
      as: 'positions',
    })
  }

  return EventType
}
