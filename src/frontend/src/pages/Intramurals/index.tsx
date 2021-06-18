import React, { FC } from 'react'

import Default from 'layouts/Default'

const Inner: FC = () => {
  return <div>{'Intramurals logic'}</div>
}

const Intramurals: FC = () => {
  return (
    <Default>
      <Inner />
    </Default>
  )
}

export default Intramurals