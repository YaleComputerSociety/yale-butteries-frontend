'use strict'

module.exports = {
  up: async (queryInterface) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'positions',
      [
        {
          position: 'Undergraduate',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position: 'Administration',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position: 'Faculty',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('positions', null, {})
  },
}
