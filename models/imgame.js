module.exports = (sequelize, DataTypes) => {
  const ImGame = sequelize.define(
    'ImGame',
    {
      team_1_score: DataTypes.INTEGER,
      team_2_score: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
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
      as: 'team1',
    })
    ImGame.belongsTo(models.College, {
      foreignKey: 'team_2_key',
      as: 'team2',
    })
    ImGame.hasMany(models.Stat, {
      foreignKey: 'imgame_id',
      as: 'stats',
    })
  }

  return ImGame
}
