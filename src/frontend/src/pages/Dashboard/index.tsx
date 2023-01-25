import React, { FC } from 'react'

import Default from '../../layouts/Default'

const Inner: FC = () => {
  return <div>{'Dashboard logic'}</div>
}

const Dashboard: FC = () => {
  return (
    <Default>
      <Inner />
    </Default>
  )
}

export default Dashboard
