import './Page.css';
import {Link} from "react-router-dom";

export function  RegisterSuccess(){
    return(
        <div className={'register-success'}>
            <div>
                Registration is successfull, please proceed to <Link to={'/login'}>login now.</Link>
            </div>
        </div>
    );
}