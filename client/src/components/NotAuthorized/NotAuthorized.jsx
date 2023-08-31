import React from 'react'
import { Link } from 'react-router-dom';
import './NotAuthorized.modules.css'

const NotAuthorized = () => {
    return (
        <div className='containererror'>
            <img src={require('./errorimg.png')} alt="Error"/>
            Sorry, you are not authorized to enter here
            <Link to="/">
                <button className='btnReload'>Back</button>
            </Link>
        </div>

    )
}

export default NotAuthorized
