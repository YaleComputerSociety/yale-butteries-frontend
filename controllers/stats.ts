import db from '../models/'

const { Stat } = db

export default {
  async getAllStats(req: any, res: any): Promise<void> {
    try {
      const statCollection = await Stat.findAll()
      const stats = []
      for (let i = 0; i < statCollection.length; i++) {
        const stat = {
          ...statCollection[i].dataValues,
        }
        stats.push(stat)
      }
      res.send(stats)
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async getStat(req: any, res: any): Promise<void> {
    try {
      const id = req.params.statId
      const targetStat = await Stat.findByPk(id)
      res.send(
        JSON.stringify({
          ...targetStat.dataValues,
        })
      )
    } catch (e) {
      res.status(400).send(e)
    }
  },
}
