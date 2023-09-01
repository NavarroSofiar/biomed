import { Link } from 'react-router-dom'
import './Card.modules.css'

const Card = ({ id, name, job_title, experience, location }) => {

  return (
    <div className='col-lg-3 col-md-6 col-sm-12 mb-3 mr-3' style={{ marginRight: '30px', marginTop: '20px' }}>
      <div className='card border-light mb-3'>
        <Link to={`/api/jobs/${id}`}>
          <div class="card-header">{name}</div>
          <div class="card-body">
            <h5 class="card-title">{job_title}</h5>
            <h6>{experience}</h6>
            <p class="card-text">{location}</p>
          </div>
          <h3></h3>
         
          <p></p>
        </Link>
      </div>
    </div>
  )
}

export default Card


