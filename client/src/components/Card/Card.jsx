import { Link } from 'react-router-dom'
import './Card.modules.css'

const Card = ({ id, name, job_title, experience, location}) => {

  return (
    <div className='container'>
      <div className='jobCard'>
        <Link to={`/api/jobs/${id}`}>
          <h2>{name} </h2>
          <h3>{job_title}</h3>
          <h6>{experience}</h6>
          <p>{location}</p>
        </Link>



      </div>
    </div>
  )
}

export default Card

