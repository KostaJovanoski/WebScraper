import axios from 'axios';
import {Request} from "./RequestService";

export class UserService {
    constructor() {
        this.axios = axios.create();
    }
    
    async loginUser(loginModel){
        return Request.post(`/users/authenticate`, loginModel);
    }
    
    setLoggedUser(user){
        if(user){
            sessionStorage.setItem('user', JSON.stringify(user));
        }
    }
    
    checkUserLogin(){
        return sessionStorage.getItem('user');
    }
    
    async registerUser(registerModel){
        return Request.post('/users', {...registerModel});
    }
}