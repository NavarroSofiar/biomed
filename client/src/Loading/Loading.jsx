import React from 'react'
import './Loading.modules.css'

const Loading = () => {
  return (
    <div className='load-container'>
      <h1>Loading...</h1>
      <div className="spinner-container">
        <div className="loading-spinner">

        </div>
      </div>
    </div>
  )
}

export default Loading
