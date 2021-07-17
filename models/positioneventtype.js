module.exports = (sequelize, DataTypes) => {
  const PositionEventType = sequelize.define(
    'PositionEventType',
    {
      position_id: DataTypes.INTEGER,
      event_type_id: DataTypes.INTEGER,
    },
    {
      tableName: 'positions_event_types',
      underscored: true,
    }
  )

  PositionEventType.associate = function (models) {
    PositionEventType.belongsTo(models.Position, {
      foreignKey: 'position_id',
      as: 'position',
    })
    PositionEventType.belongsTo(models.EventType, {
      foreignKey: 'event_type_id',
      as: 'eventType',
    })
  }

  return PositionEventType
}
