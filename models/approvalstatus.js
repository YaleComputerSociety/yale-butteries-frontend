module.exports = (sequelize, DataTypes) => {
  const ApprovalStatus = sequelize.define(
    'ApprovalStatus',
    {
      status: DataTypes.STRING,
    },
    {
      tableName: 'approval_statuses',
      underscored: true,
    }
  )

  ApprovalStatus.associate = function (models) {
    ApprovalStatus.hasMany(models.Event, {
      foreignKey: 'approval_status_id',
      as: 'events',
    })
  }

  return ApprovalStatus
}
