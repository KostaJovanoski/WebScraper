import {UserService} from "../services/UserService";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export function UseCheckLogin() {
    const userService = new UserService();
    const navigator = useNavigate();
    useEffect(() => {
        if(!userService.checkUserLogin()){
            return navigator('/login');
        }
    }, [userService.checkUserLogin]);
}