import React from 'react'
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='containererror'>
            <img src={require('./notFound.png')} alt="Error"/>
            Sorry, you are lost
            <Link to="/">
                <button className='btnReload'>Back</button>
            </Link>
        </div>
  )
}

export default NotFound
