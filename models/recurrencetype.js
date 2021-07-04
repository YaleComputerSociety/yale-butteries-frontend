module.exports = (sequelize, DataTypes) => {
  const RecurrenceType = sequelize.define(
    'RecurrenceType',
    {
      type: DataTypes.STRING,
    },
    {
      tableName: 'recurrence_types',
      underscored: true,
    }
  )

  RecurrenceType.associate = function (models) {
    RecurrenceType.hasMany(models.Event, {
      foreignKey: 'recurrence_type_id',
      as: 'events',
    })
    RecurrenceType.hasMany(models.Room, {
      foreignKey: 'recurrence_type_id',
      as: 'rooms',
    })
  }

  return RecurrenceType
}
