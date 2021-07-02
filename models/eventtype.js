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
    EventType.belongsTo(models.Position, {
      foreignKey: 'position_id',
      as: 'position',
    })
    EventType.hasMany(models.Event, {
      foreignKey: 'event_type_id',
      as: 'events',
    })
  }

  return EventType
}
