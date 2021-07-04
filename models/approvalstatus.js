'use strict'
import Model from 'sequelize'

// Change models from current design
// Change to functional

module.exports = (sequelize, DataTypes) => {
  class ApprovalStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ApprovalStatus.hasMany(models.Event)
    }
  }
  ApprovalStatus.init(
    {
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ApprovalStatus',
      tableName: 'approval_statuses',
      underscored: true,
    }
  )
  return ApprovalStatus
}
