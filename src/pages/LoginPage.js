import './Page.css';
import {useState} from "react";
import {Spinner} from "../components/Spinner";
import {UserService} from "../services/UserService";
import {Link, useNavigate} from "react-router-dom";
import {UseRedirectIfLoggedIn} from "../hooks/UseRedirectIfLoggedIn";

export function LoginPage() {
    UseRedirectIfLoggedIn();
    const navigator = useNavigate();
    const [loginModel, setLoginModel] = useState({email: '', password: ''});
    const [formValid, setFormValid] = useState(true);
    const [reveal, setReveal] = useState(false);
    const [errResp, setErrResp] = useState(null);

    const submitLogin = async (e) => {
        e.preventDefault();
        setErrResp(null);
        if (!loginModel.email || !loginModel.password) {
            setFormValid(false);
            return;
        }
        setFormValid(true);
        setReveal(true);
        await sendLoginRequest(loginModel);
    }

    const sendLoginRequest = async (loginModel) => {
        try {
            const userService = new UserService();
            const response = await userService.loginUser(loginModel);
            userService.setLoggedUser(response.data);
            setReveal(false);
            return navigator('/scraper');
        } catch (err) {
            setReveal(false);
            setErrResp(err.response.data);
            setFormValid(false);
        }
    }
    return (
        <div className={'login-page'}>
            <p className={'sedc-logo'}>SEDC</p>
            <h4><i className="bi bi-lock-fill"></i>Sign In</h4>
            <form onSubmit={submitLogin}>
                <div className={'form-row'}>
                    <input type={'text'} value={loginModel.email} placeholder={'Email'} onChange={(e) => {
                        setLoginModel({...loginModel, email: e.target.value});
                    }}/>
                </div>
                <div className={'form-row'}>
                    <input type={'password'} value={loginModel.password} placeholder={'Password'} onChange={(e) => {
                        setLoginModel({...loginModel, password: e.target.value})
                    }}/>
                </div>
                <div className={'form-row d-grid'}>
                    <button className={'btn btn-primary'}>Login</button>
                    <Link className={'helper-link'} to={'/register'}>Don't have account? register here</Link>
                </div>
                <div className={!formValid ? 'validation-errors visible' : 'validation-errors'}>
                    <i className="bi bi-x-octagon"></i> {errResp ?? 'Email and password are required'}
                </div>
            </form>
            <Spinner reveal={reveal}/>
        </div>
    );
}