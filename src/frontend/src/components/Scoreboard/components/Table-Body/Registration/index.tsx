import React from 'react'
import { PlayerTableProps } from '../../../index'
import Button from '../Button'
import { addStat, deleteStat } from '../../../../../../../controllers/Stats'

/**
 * @param {userWithStat[]} players List of players whose stats shall be displayed.
 * @returns The body of the table displaying the stats of players.
 */
const Registration = (players, game) => {
  return (
    <div>
      <Button onClick={addStat({null, null, null, game.id, currentPlayer}, )} value="register" />

      <Button onClick={deleteStat} value="unregister" />
    </div>
  )
}

export default Registration
