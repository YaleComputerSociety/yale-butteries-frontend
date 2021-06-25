'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('events', 'event_type_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'event_types',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    })

    await queryInterface.addColumn('events', 'recurrence_type_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'recurrence_types',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    })

    await queryInterface.addColumn('events', 'room_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'rooms',
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

    await queryInterface.removeColumn('events', 'room_id')
    await queryInterface.removeColumn('events', 'recurrence_type_id')
    await queryInterface.removeColumn('events', 'event_type_id')
  },
}
