import axios from "axios"

export const postJob = (payload) => (dispatch) => {
    axios.post(`http://localhost:5000/api/jobs`, payload)
    .catch(error => console.log(error))
    
}