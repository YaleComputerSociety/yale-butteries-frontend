'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.renameColumn('positions', 'createdAt', 'created_at')
    await queryInterface.renameColumn('positions', 'updatedAt', 'updated_at')

    await queryInterface.renameColumn('event_types', 'createdAt', 'created_at')
    await queryInterface.renameColumn('event_types', 'updatedAt', 'updated_at')

    await queryInterface.renameColumn('colleges', 'createdAt', 'created_at')
    await queryInterface.renameColumn('colleges', 'updatedAt', 'updated_at')

    await queryInterface.renameColumn('users', 'createdAt', 'created_at')
    await queryInterface.renameColumn('users', 'updatedAt', 'updated_at')

    await queryInterface.renameColumn('sports', 'createdAt', 'created_at')
    await queryInterface.renameColumn('sports', 'updatedAt', 'updated_at')

    await queryInterface.renameColumn('im_games', 'createdAt', 'created_at')
    await queryInterface.renameColumn('im_games', 'updatedAt', 'updated_at')

    await queryInterface.renameColumn('stats', 'createdAt', 'created_at')
    await queryInterface.renameColumn('stats', 'updatedAt', 'updated_at')
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.renameColumn('positions', 'created_at', 'createdAt')
    await queryInterface.renameColumn('positions', 'updated_at', 'updatedAt')

    await queryInterface.renameColumn('event_types', 'created_at', 'createdAt')
    await queryInterface.renameColumn('event_types', 'updated_at', 'updatedAt')

    await queryInterface.renameColumn('colleges', 'created_at', 'createdAt')
    await queryInterface.renameColumn('colleges', 'updated_at', 'updatedAt')

    await queryInterface.renameColumn('users', 'created_at', 'createdAt')
    await queryInterface.renameColumn('users', 'updated_at', 'updatedAt')

    await queryInterface.renameColumn('sports', 'created_at', 'createdAt')
    await queryInterface.renameColumn('sports', 'updated_at', 'updatedAt')

    await queryInterface.renameColumn('im_games', 'created_at', 'createdAt')
    await queryInterface.renameColumn('im_games', 'updated_at', 'updatedAt')

    await queryInterface.renameColumn('stats', 'created_at', 'createdAt')
    await queryInterface.renameColumn('stats', 'updated_at', 'updatedAt')
  },
}
