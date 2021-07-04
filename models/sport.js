module.exports = (sequelize, DataTypes) => {
  const Sport = sequelize.define(
    'Sport',
    {
      sport: DataTypes.STRING,
    },
    {
      tableName: 'sports',
      underscored: true,
    }
  )

  Sport.associate = function (models) {
    Sport.hasMany(models.ImGame, {
      foreignKey: 'sport_id',
      as: 'imGames',
    })
  }

  return Sport
}
