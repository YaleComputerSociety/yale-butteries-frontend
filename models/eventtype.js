'use strict'

module.exports = (sequelize, DataTypes) => {
  class EventType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EventType.belongsTo(models.Position)
      EventType.hasMany(models.Event)
    }
  }
  EventType.init(
    {
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'EventType',
      tableName: 'event_types',
    }
  )
  return EventType
}
