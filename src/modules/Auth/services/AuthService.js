import apiService from "../../../services/apiService";
const baseUrl = 'http://localhost:3030/api'

const Login = async (data) => {
    try {
        const res = await apiService.api.post(`${baseUrl}/user/signIn`, data);
        console.log(res);
        return res.data;
    } catch (err) {
        console.log("err", err)
    }
}

const SignUp = async (data) => {
    try {
        const res = await apiService.api.post(`${baseUrl}/user/userSignup`, data);
        console.log(res);
        return res.data;
    } catch (err) {
        console.log("err", err)
    }
}


const AuthService = {
    Login,
    SignUp
}

export default AuthService;