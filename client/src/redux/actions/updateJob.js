import axios from "axios"

 export const updateJob = (id) => (dispatch) => {
    axios.put(`http://localhost:5000/api/jobs/${id._id}`,id)
    /* .then(response => console.log('este id',id._id)) */
    .catch(error => console.log(error))
} 

