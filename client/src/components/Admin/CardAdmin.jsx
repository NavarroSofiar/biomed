import { Link, useNavigate } from 'react-router-dom'
import './CardAdmin.modules.css'
import { useDispatch } from 'react-redux';
import { deleteJob } from '../../redux/actions/deleteJob';
import swal from 'sweetalert';

const CardAdmin = ({ id, name, job_title, experience, location }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDelete = () => {
        dispatch(deleteJob(id))
        setTimeout(() => {
            navigate('/admin')
        }, 1000)
        swal({
            title: 'Job deleted successfully!',
            icon: "success",
            button: "Ok"
        })
        //window.location.reload()
        //window.scrollTo(0, 0);
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return (
        <div className='container ad'>
            <div className='card custom-background border-light mb-3'>
                <Link to={`/api/jobs/${id}`} className="custom-link">
                    <div class="card-header">{name}</div>
                    <div class="card-body">
                        <h5 class="card-title">{job_title}</h5>
                        <h6>{experience}</h6>
                        <p class="card-text">{location}</p>
                    </div>
                </Link>

                <button className='btn-secondary btndelete' onClick={handleDelete} >X</button>


                <Link to={`/admin/editjobs/${id}`}>
                    <button className='edit btn btn-secondary' >Edit</button>
                </Link>



            </div>
        </div>
    )
}

export default CardAdmin