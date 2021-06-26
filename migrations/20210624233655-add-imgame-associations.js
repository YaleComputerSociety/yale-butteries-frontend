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
      .addColumn('im_games', 'team_1_key', {
        type: Sequelize.INTEGER,
        references: {
          model: 'colleges',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('im_games', ['team_1_key'], {
          name: 'im_games_team_1_key_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface
      .addColumn('im_games', 'team_2_key', {
        type: Sequelize.INTEGER,
        references: {
          model: 'colleges',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('im_games', ['team_2_key'], {
          name: 'im_games_team_2_key_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface
      .addColumn('im_games', 'sport_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'sports',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('im_games', ['sport_id'], {
          name: 'im_games_sport_id_idx_fkey',
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

    await queryInterface.removeIndex('im_games', 'sport_id')
    await queryInterface.removeIndex('im_games', 'team_2_key')
    await queryInterface.removeIndex('im_games', 'team_1_key')

    await queryInterface.removeColumn('im_games', 'sport_id')
    await queryInterface.removeColumn('im_games', 'team_2_key')
    await queryInterface.removeColumn('im_games', 'team_1_key')
  },
}
