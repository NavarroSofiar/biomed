import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom"
import { updateJob } from "../../redux/actions/updateJob";
import { getById } from '../../redux/actions/getById'
import swal from 'sweetalert';


const EditJobForm = () => {

    const [input, setInput] = useState({
        name: '',
        job_title: '',
        experience: '',
        location: '',
        about_us: '',
        job_responsabilities: '',
        job_description: '',
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const jobs = useSelector((state) => state.state.detail);
    // console.log(jobs._id)


    const jobId = useParams()
    // console.log(jobId)


    useEffect(() => {
        dispatch((getById(jobId)));
    }, [dispatch, jobId])

    useEffect(() => {
        if (jobs) {
            setInput({
                _id: jobs._id,
                name: jobs.name || '',
                job_title: jobs.job_title || '',
                experience: jobs.experience || '',
                location: jobs.location || '',
                about_us: jobs.about_us || '',
                job_responsabilities: jobs.job_responsabilities || '',
                job_description: jobs.job_description || '',
                expiration_date: jobs.expiration_date || '',
            });
        }
    }, [jobs])

    const handleChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })


    }

    const handleSubmit = e => {
        e.preventDefault()
        if (input.name &&
            input.job_title &&
            input.job_responsabilities &&
            input.job_description &&
            input.experience &&
            input.about_us &&
            input.location && input.expiration_date) {
            dispatch(updateJob(input))
            swal({
                title: 'Job updated successfully!',
                icon: "success",
                button: "Ok"
            })
            setInput({
                name: '',
                job_title: '',
                experience: '',
                location: '',
                about_us: '',
                job_responsabilities: '',
                job_description: '',
                expiration_date: ''
            })
            navigate('/admin')
        }
        else {
            swal({
                title: 'Please complete all the fields to continue, accept',
                icon: "info",
                button: "ok"
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className='form-order'>
            <h1>Edition Form</h1>
            <input
                name="name"
                type="text"
                placeholder="name"
                onChange={handleChange}
                value={input.name}
            />
            <input
                name="job_title"
                type="text"
                placeholder="title"
                onChange={handleChange}
                value={input.job_title}
            />
            <input
                name="experience"
                type="text"
                placeholder="experience"
                onChange={handleChange}
                value={input.experience}
            />
            <input
                name="location"
                type="text"
                placeholder="location"
                onChange={handleChange}
                value={input.location}
            />
            <input
                name="about_us"
                type="text"
                placeholder="about_us"
                onChange={handleChange}
                value={input.about_us}
            />
            <input
                name="job_responsabilities"
                type="text"
                placeholder="job_responsabilities"
                onChange={handleChange}
                value={input.job_responsabilities}
            />

            <input
                name="job_description"
                type="text"
                placeholder="description"
                onChange={handleChange}
                value={input.job_description}
            />
            <input
                name="expiration_date"
                type="date"
                placeholder="expiration_date"
                onChange={handleChange}
                value={input.expiration_date} />

            <button className='btnReload'>Save</button>
        </form>
    )
}


export default EditJobForm
