import React, { FC, useState } from 'react'

import Default from 'layouts/Default'
import { getJSON } from 'utils/fetch'

const Inner: FC = () => {
  const pathPrefix = '/api/users'

  async function makeAPICall() {
    const results = await getJSON(pathPrefix)
    console.log(results)
  }

  return (
    <>
      <button onClick={makeAPICall}>{'Api Call'}</button>
    </>
  )
}

const Testing: FC = () => {
  return (
    <Default>
      <Inner />
    </Default>
  )
}

export default Testing
