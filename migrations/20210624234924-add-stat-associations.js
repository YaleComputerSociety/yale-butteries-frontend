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
      .addColumn('stats', 'imgame_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'im_games',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('stats', ['imgame_id'], {
          name: 'stats_imgame_id_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface
      .addColumn('stats', 'user_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('stats', ['user_id'], {
          name: 'stats_user_id_idx_fkey',
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

    await queryInterface.removeIndex('stats', 'user_id')
    await queryInterface.removeIndex('stats', 'im_game_id')

    await queryInterface.removeColumn('stats', 'user_id')
    await queryInterface.removeColumn('stats', 'imgame_id')
  },
}
