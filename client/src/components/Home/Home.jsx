import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from '../../redux/actions/getJobs'
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
  else
{
  return (
    <div className="home-order">
      <div className="cards-container">
        {

          currentJobs ? currentJobs.length
            ? currentJobs.map(j => (
              <Card
                name={j.name}
                key={j._id}
                id={j._id}
                job_title={j.job_title}
                experience={j.experience}
                location={j.location}
                about_us={j.about_us}
                job_responsabilities={j.job_responsabilities}
                job_description={j.job_description}
                createdAt={j.createdAt} />
            ))
            : <div>No jobs available</div>
            : <div>Loading...</div>
        }
      </div>
      <Paged
        jobsPerPage={jobsPerPage}
        allJobs={jobs.length}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />



    </div>
  )}
}

export default Home
