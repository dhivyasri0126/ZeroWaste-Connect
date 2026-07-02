import axios from "axios";

const BASE_URL = "http://localhost:8081/user";

class UserService {

    registerUser(user){
        return axios.post(BASE_URL + "/register", user);
    }

    loginUser(user){
        return axios.post(BASE_URL + "/login", user);
    }

    getAllUsers(){
        return axios.get(BASE_URL + "/all");
    }

}

export default new UserService();