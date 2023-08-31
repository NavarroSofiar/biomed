import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getById} from '../../redux/actions/getById'
import swal from 'sweetalert';
import './Detail.modules.css'

const Detail = () => {
    const dispatch= useDispatch()
    const navigate = useNavigate()
    const detailjob = useSelector((state =>state.state.detail))
    console.log(detailjob)
   
    const jobId= useParams()
    

   useEffect(()=>{
    dispatch(getById(jobId));
  },[dispatch,jobId])
   
  const handleOnclick = e => {
    swal({
      title: 'You applied successfully!',
      icon: "success",
      button: "Ok"
  })
  navigate('/')
  }

  return (
    <div className= "container-detail">
     { detailjob && typeof detailjob === 'object' ?
     <div>
      <h7></h7>
      <h1>Name: {detailjob.name} </h1>
      <h2>Job Title: {detailjob.job_title}</h2>
      <h3>Experience: {detailjob.experience} </h3>
      <p>Location:{detailjob.location}</p>
      <p>About us: {detailjob.about_us}</p>
      <p>Responsabilities:{detailjob.job_responsabilities}</p>
      <p>Description:{detailjob.job_description}</p>
      <p>Created:{detailjob.createdAt}</p>
      <p>Expiration_date:{detailjob.expiration_date}</p>

     </div>
     :
     <div>Loading</div>
     }
     <button className='btnReload' onClick={handleOnclick}>Apply</button>
    </div>
    
  )
}

export default Detail
