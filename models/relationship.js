'use strict'

import Model from 'sequelize'

module.exports = (sequelize, DataTypes) => {
  class Relationship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Relationship.hasMany(models.UsersEvent)
    }
  }
  Relationship.init(
    {
      relationship: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Relationship',
      tableName: 'relationships',
      underscored: true,
    }
  )
  return Relationship
}
