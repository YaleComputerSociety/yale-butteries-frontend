'use strict'
import Model from 'sequelize'

module.exports = (sequelize, DataTypes) => {
  class Stat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Stat.belongsTo(models.ImGame)
      Stat.belongsTo(models.User)
    }
  }
  Stat.init(
    {
      points: DataTypes.INTEGER,
      rebounds: DataTypes.INTEGER,
      assists: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Stat',
      tableName: 'stats',
    }
  )
  return Stat
}
