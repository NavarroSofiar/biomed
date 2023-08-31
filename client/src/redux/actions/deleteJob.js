import axios from "axios"

 export const deleteJob = (id) => (dispatch) => {
     axios.delete(`http://localhost:5000/api/jobs/${id}`,id)
    /* .then(response => console.log('este id',id)) */
    .catch(error => console.log(error))  
} 