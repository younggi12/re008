import React from 'react'
import useCouterStore from '../store/counterStore'

const Counter = () => {
    const { count, increase, decrease } = useCouterStore()

  return (
    <div>
       <h2>{count} </h2>
       <br/><br/>
       <button onClick={increase}>+</button>
       <button onClick={decrease}>-</button>
    </div>
  )
}

export default Counter
