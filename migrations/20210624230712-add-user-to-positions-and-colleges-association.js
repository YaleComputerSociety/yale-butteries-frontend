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
      .addColumn('users', 'position_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'positions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('users', ['position_id'], {
          name: 'users_position_id_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface
      .addColumn('users', 'college_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'colleges',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('users', ['college_id'], {
          name: 'users_college_id_idx_fkey',
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

    await queryInterface.removeIndex('users', 'idx_college_id')
    await queryInterface.removeIndex('users', 'idx_position_id')
    await queryInterface.removeColumn('users', 'college_id')
    await queryInterface.removeColumn('users', 'position_id')
  },
}
