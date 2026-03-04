import apiService from "../../../services/apiService";
const baseUrl = 'http://localhost:3030/api'

const findProfile = async (id) => {
    try {
        const res = await apiService.api.post(`${baseUrl}/user/findProfile`, {budgetbodyId: id});
        return res.data;
    } catch (err) {
        console.log("err", err)
    }
}

const createTrip = async (data) => {
    try {
        const res = await apiService.api.post(`${baseUrl}/trip/create-trip`, data); 
        return res.data;
    }   
    catch (err) {
        console.log("err", err)
    }   
}



const TripService = {
    findProfile,
    createTrip
}

export default TripService;