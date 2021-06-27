'use strict'

import Model from 'sequelize'

module.exports = (sequelize, DataTypes) => {
  class ImGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ImGame.belongsTo(models.Sport)
      ImGame.belongsTo(models.College)
      ImGame.hasMany(models.Stat)
    }
  }
  ImGame.init(
    {
      team_1_score: DataTypes.INTEGER,
      team_2_score: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'ImGame',
      tableName: 'im_games',
    }
  )
  return ImGame
}
