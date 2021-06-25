'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('users_events', 'attendance_status_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'attendance_statuses',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    })

    await queryInterface.addColumn('users_events', 'relationship_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'relationships',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('users_events', 'relationship_id')
    await queryInterface.removeColumn('users_events', 'attendance_status_id')
  },
}
