module.exports = (sequelize, DataTypes) => {
  const Stat = sequelize.define(
    'Stat',
    {
      points: DataTypes.INTEGER,
      rebounds: DataTypes.INTEGER,
      assists: DataTypes.INTEGER,
    },
    {
      tableName: 'stats',
      underscored: true,
    }
  )

  Stat.associate = function (models) {
    Stat.belongsTo(models.ImGame, {
      foreignKey: 'imgame_id',
      as: 'imGame',
    })
    Stat.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    })
  }

  return Stat
}
