import React, { FC } from 'react'

import Default from 'layouts/Default'

const Inner: FC = () => {
  return <div>{'Events logic test'}</div>
}

const Events: FC = () => {
  return (
    <Default>
      <Inner />
    </Default>
  )
}

export default Events
