module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define(
    'Relationship',
    {
      relationship: DataTypes.STRING,
    },
    {
      tableName: 'relationships',
      underscored: true,
    }
  )

  Relationship.associate = function (models) {
    Relationship.hasMany(models.UsersEvent, {
      foreignKey: 'relationship_id',
      as: 'users_events',
    })
  }

  return Relationship
}
