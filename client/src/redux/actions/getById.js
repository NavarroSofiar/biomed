import { getJobById } from "../slices";
import axios from "axios";

export const getById = (id) => (dispatch) => {
    
    axios.get(`http://localhost:5000/api/jobs/${id.id}`)
        .then(res => dispatch(getJobById(res.data)))
        .catch(e => console.log(e))
}
