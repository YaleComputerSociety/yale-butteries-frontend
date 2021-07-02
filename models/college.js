module.exports = (sequelize, DataTypes) => {
  const College = sequelize.define(
    'College',
    {
      college: DataTypes.STRING,
    },
    {
      tableName: 'colleges',
      underscored: true,
    }
  )

  College.associate = function (models) {
    College.hasMany(models.User, {
      foreignKey: 'college_id',
      as: 'users',
    })
    College.hasMany(models.ImGame, {
      foreignKey: 'team_1_key',
      as: 'imGamesTeam1',
    })
    College.hasMany(models.ImGame, {
      foreignKey: 'team_2_key',
      as: 'imGamesTeam2',
    })
    College.hasMany(models.Room, {
      foreignKey: 'college_id',
      as: 'rooms',
    })
  }

  return College
}
