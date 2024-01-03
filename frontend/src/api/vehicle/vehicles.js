import axios from "axios"
import {BASE_URL, NEW_BASE_URL, token} from "../../ultils/axiosApi"


export const getVehiclesData = async () => {
    const response = await axios.get(`${NEW_BASE_URL}/vehicle/list`, { headers: { token: token } });
    return response.data.data; 
}




