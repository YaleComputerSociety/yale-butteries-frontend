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
      .addColumn('rooms', 'recurrence_type_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'recurrence_types',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('rooms', ['recurrence_type_id'], {
          name: 'rooms_recurrence_type_id_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface
      .addColumn('rooms', 'college_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'colleges',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('rooms', ['college_id'], {
          name: 'rooms_college_id_idx_fkey',
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

    await queryInterface.removeIndex('rooms', 'college_id')
    await queryInterface.removeIndex('rooms', 'recurrence_type_id')

    await queryInterface.removeColumn('rooms', 'college_id')
    await queryInterface.removeColumn('rooms', 'recurrence_type_id')
  },
}
