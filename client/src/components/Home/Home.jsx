import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from '../../redux/actions/getJobs'
import { Link } from 'react-router-dom'
import Card from '../Card/Card'
import Paged from '../Paged/Paged';
import './Home.modules.css'
import Loading from '../../Loading/Loading';
import { setLoading } from '../../redux/actions/loading';

const Home = () => {
  const jobs = useSelector((state) => state.state.jobs)
  const loading = useSelector((state) => state.state.loading);
  // console.log(jobs)


  const [currentPage, setCurrentPage] = useState(1)
  const [jobsPerPage] = useState(5)
  const indexOfLastJob = currentPage * jobsPerPage
  const indexOfFirstJob = indexOfLastJob - jobsPerPage


  const currentJobs = jobs.slice(
    indexOfFirstJob,
    indexOfLastJob
  ); //leave only the number of jobs I need on each page



  const totalPages = (pageNumber) => {
    setCurrentPage(pageNumber)
  }


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobs());
    dispatch(setLoading(true));
    window.scrollTo(0, 0);
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1500);
  }, [dispatch])
  if (loading) {
    return (
      <Loading />
    )
  }
  else {
    return (
      <div className="home-order">
        <div className="cards-container">
          {currentJobs.length ? (
            <table className="table  table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Job Title</th>
                  <th scope="col">Experience</th>
                  <th scope="col">Location</th>

                </tr>
              </thead>
              <tbody>

                {currentJobs.map((j, index) => (

                  <tr key={j._id}>
                    <th scope="row">{index + 1}</th>
                    <td><Link to={`/api/jobs/${j._id}`}>{j.name}</Link></td>
                    <td><Link to={`/api/jobs/${j._id}`}>{j.job_title}</Link></td>
                    <td><Link to={`/api/jobs/${j._id}`}>{j.experience}</Link></td>
                    <td><Link to={`/api/jobs/${j._id}`}>{j.location}</Link></td>
                  </tr>

                ))}
              </tbody>
            </table>
          ) : (
            <div>No jobs available</div>
          )}
        </div>

        <Paged
          jobsPerPage={jobsPerPage}
          allJobs={jobs.length}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />



      </div>
    )
  }
}

export default Home
