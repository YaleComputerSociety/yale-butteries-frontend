module.exports = (sequelize, DataTypes) => {
  const ImGame = sequelize.define(
    'ImGame',
    {
      team_1_score: DataTypes.INTEGER,
      team_2_score: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
      sport_id: DataTypes.INTEGER,
      college_id: DataTypes.INTEGER,
    },
    {
      tableName: 'im_games',
      underscored: true,
    }
  )

  ImGame.associate = function (models) {
    ImGame.belongsTo(models.Sport, {
      foreignKey: 'sport_id',
      as: 'sport',
    })
    ImGame.belongsTo(models.College, {
      foreignKey: 'team_1_key',
      as: 'college_1',
    })
    ImGame.belongsTo(models.College, {
      foreignKey: 'team_2_key',
      as: 'college_2',
    })
    ImGame.hasMany(models.Stat, {
      foreignKey: 'imgame_id',
      as: 'stats',
    })
  }

  return ImGame
}
