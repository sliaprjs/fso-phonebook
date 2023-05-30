import React from 'react'

const Filter = ({filtered, onFilter}) => {
  return (
    <div>
        Search: <input value={filtered} onChange={onFilter}/>
      </div>
  )
}

export default Filter