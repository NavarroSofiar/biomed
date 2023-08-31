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
            <div className='jobCard admin'>
                <Link className='cardadmin' to={`/admin/jobs/${id}`}>
                    <h2>{name} </h2>
                    <h3>{job_title}</h3>
                    <h6>{experience}</h6>
                    <p>{location}</p>
                </Link>
                <button className='btndelete' onClick={handleDelete} >X</button>


                <Link to={`/admin/editjobs/${id}`}>
                    <button className='btnReload edit' >Edit</button>
                </Link>



            </div>
        </div>
    )
}

export default CardAdmin