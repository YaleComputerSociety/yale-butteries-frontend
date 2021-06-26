'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    //event_types belongs to positions

    await queryInterface
      .addColumn('event_types', 'position_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'positions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('event_types', ['position_id'], {
          name: 'event_types_position_id_idx_fkey',
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

    queryInterface.removeIndex('event_types', 'idx_position_id')
    queryInterface.removeColumn('event_types', 'position_id')
  },
}
