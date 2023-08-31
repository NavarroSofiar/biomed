import { getAlljobs } from "../slices";
import axios from "axios";

 export const getJobs = () => (dispatch) => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/jobs`)
    //axios.get('http://localhost:5000/api/jobs')
        .then(res => dispatch(getAlljobs(res.data)))
        .catch(e => console.log(e))
}
 

/* export const getJobs = (offset = 0, limit = 2) => (dispatch) => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/jobs?offset=${offset}&limit=${limit}`)
      .then((res) => dispatch(getAlljobs(res.data)))
      .catch((e) => console.log(e));
  }; */
  


