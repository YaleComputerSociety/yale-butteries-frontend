import React from 'react'
import { PlayerTableProps } from '../../../index'
import Button from '../Button'
import { addStat, deleteStat } from '../../../../../../../controllers/Stats'

/**
 * @param {userWithStat[]} players List of players whose stats shall be displayed.
 * @returns The body of the table displaying the stats of players.
 */
const Registration = (players, game) => {
  function alertAdd() {
    alert('add')
  }

  function alertRemove() {
    alert('remove')
  }

  return (
    <div>
      <Button onClick={alertAdd} value="Register" />
      {/* <Button onClick={alertRemove} value="Unregister" /> */}
    </div>
  )
}

export default Registration
