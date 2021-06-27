'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface
      .addColumn('users_events', 'attendance_status_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'attendance_statuses',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('users_events', ['attendance_status_id'], {
          name: 'users_events_attendance_status_id_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface
      .addColumn('users_events', 'relationship_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'relationships',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('users_events', ['relationship_id'], {
          name: 'users_events_relationship_id_idx_fkey',
          using: 'BTREE',
        })
      )

    queryInterface.addIndex('users_events', ['event_id'], {
      name: 'users_events_event_id_idx_fkey',
      using: 'BTREE',
    })

    queryInterface.addIndex('users_events', ['user_id'], {
      name: 'users_events_user_id_idx_fkey',
      using: 'BTREE',
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeIndex('users_events', 'user_id')
    await queryInterface.removeIndex('users_events', 'event_id')
    await queryInterface.removeIndex('users_events', 'relationship_id')
    await queryInterface.removeIndex('users_events', 'attendance_status_id')

    await queryInterface.removeColumn('users_events', 'relationship_id')
    await queryInterface.removeColumn('users_events', 'attendance_status_id')
  },
}
