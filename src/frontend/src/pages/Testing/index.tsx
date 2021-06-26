import React, { FC, useState } from 'react'

import Default from 'layouts/Default'
import Form from 'components/Form'

const Inner: FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  function makeVisible() {
    setIsVisible(true)
  }

  return (
    <>
      <button onClick={makeVisible}>{'Form Click'}</button>
      <Form isVisible={isVisible} setIsVisible={setIsVisible}>
        <div>
          <p>Hello first paragraph!</p>
          <p>Hello second paragraph!</p>
        </div>
      </Form>
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
