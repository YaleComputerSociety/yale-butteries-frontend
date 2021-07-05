import db from '../models/'

const { User } = db

export default {
  async getAllUsers(req: any, res: any): Promise<void> {
    try {
      const userCollection = await User.findAll()
      const users = []
      for (let i = 0; i < userCollection.length; i++) {
        const userPosition = await userCollection[i].getPosition()
        const positionProperty = userPosition.dataValues.position
        const userCollege = await userCollection[i].getCollege()
        const collegeProperty = userCollege.dataValues.college
        const modifiedObject = {
          ...userCollection[i].dataValues,
          position: positionProperty,
          college: collegeProperty,
        }
        users.push(modifiedObject)
      }
      res.send(users)
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async getUser(req: any, res: any): Promise<void> {
    try {
      const id = req.params.userId
      const targetUser = await User.findByPk(id)
      const userPosition = await targetUser.getPosition()
      const positionProperty = userPosition.dataValues.position
      const userCollege = await targetUser.getCollege()
      const collegeProperty = userCollege.dataValues.college
      res.send(
        JSON.stringify({
          ...targetUser.dataValues,
          position: positionProperty,
          college: collegeProperty,
        })
      )
    } catch (e) {
      res.status(400).send(e)
    }
  },
}
