import React from 'react'

// Stats Table, one stats table collection of bunch of different sports state, for a given sport, will be set to null, any stat with this record that isn't display to null will be displayed
const HeaderRow = () => {
  const header = ['Player', 'Rebounds', 'Assists', 'Points']
  return (
    <thead>
      <tr>
        {header.map((h, index) => (
          <th key={index}>
            <p>{h}</p>
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default HeaderRow
