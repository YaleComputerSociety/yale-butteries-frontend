'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('events', 'approved')
    await queryInterface
      .addColumn('events', 'approval_status_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'approval_statuses',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('events', ['approval_status_id'], {
          name: 'events_approval_status_id_idx_fkey',
          using: 'BTREE',
        })
      )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeIndex('events', 'approval_status_id')
    await queryInterface.removeColumn('events', 'approval_status_id')
    await queryInterface.addColumn('events', 'approved', {
      type: Sequelize.BOOLEAN,
    })
  },
}
