import React, { FC } from 'react'

import Default from 'layouts/Default'

const Inner: FC = () => {
  return <div>{'Testing playground'}</div>
}

const Testing: FC = () => {
  return (
    <Default>
      <Inner />
    </Default>
  )
}

export default Testing
