import React, { FC } from 'react'

import Default from 'layouts/Default/'

const SAMPLEPLAYERS = [
  {
    name: 'Tucker Moses',
    minute: 30,
    rebound: 5,
    assist: 6,
    pts: 3,
  },
  {
    name: 'Tucker Moses',
    minute: 30,
    rebound: 5,
    assist: 6,
    pts: 3,
  },
  {
    name: 'Tucker Moses',
    minute: 30,
    rebound: 5,
    assist: 6,
    pts: 3,
  },
]

const statSheet = [
  {
    homeScore: 21,
    homePlayers: SAMPLEPLAYERS,
    awayScore: 17,
    awayPlayers: SAMPLEPLAYERS,
  },
  {
    homeScore: 39,
    homePlayers: SAMPLEPLAYERS,
    awayScore: 58,
    awayPlayers: SAMPLEPLAYERS,
  },
]

const Inner: FC = () => {
  return <></>
}

const Intramurals: FC = () => {
  return (
    <Default>
      <Inner />
    </Default>
  )
}

export default Intramurals
