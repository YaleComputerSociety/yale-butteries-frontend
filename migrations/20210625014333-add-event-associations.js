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
      .addColumn('events', 'event_type_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'event_types',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('events', ['event_type_id'], {
          name: 'events_event_type_id_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface
      .addColumn('events', 'recurrence_type_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'recurrence_types',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('events', ['recurrence_type_id'], {
          name: 'events_recurrence_type_id_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface
      .addColumn('events', 'room_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'rooms',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('events', ['room_id'], {
          name: 'events_room_id_idx_fkey',
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

    await queryInterface.removeIndex('events', 'room_id')
    await queryInterface.removeIndex('events', 'recurrence_type_id')
    await queryInterface.removeIndex('events', 'event_type_id')

    await queryInterface.removeColumn('events', 'room_id')
    await queryInterface.removeColumn('events', 'recurrence_type_id')
    await queryInterface.removeColumn('events', 'event_type_id')
  },
}
