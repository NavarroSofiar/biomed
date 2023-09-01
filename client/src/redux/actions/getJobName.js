import { getJobByName} from "../slices";
import axios from "axios";
import swal from 'sweetalert';

export const getJobsFromDbByName = (name) => (dispatch) => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/search/${name}`)
        .then(res => dispatch(getJobByName(res.data)))
        .catch(e => console.log(e, swal({
            title:`No hay trabajos con el nombre "${name}"`,
            icon:"error",
            button: "volver"
        })))
}