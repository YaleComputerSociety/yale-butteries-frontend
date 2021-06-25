'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('colleges', [
      {
        college: 'Benjamin Franklin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        college: 'Berkeley',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        college: 'Branford',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        college: 'Davenport',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        college: 'Ezra Stiles',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        college: 'Grace Hopper',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        college: 'Jonathan Edwards',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        college: 'Morse',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        college: 'Pauli Murray',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        college: 'Pierson',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        college: 'Saybrook',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        college: 'Silliman',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        college: 'Timothy Dwight',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        college: 'Trumbull',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('colleges', null, {})
  },
}
