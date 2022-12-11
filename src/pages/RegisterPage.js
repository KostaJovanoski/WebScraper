import {Link, useNavigate} from "react-router-dom";
import {Spinner} from "../components/Spinner";
import {useState} from "react";
import {UserService} from "../services/UserService";
import {UseRedirectIfLoggedIn} from "../hooks/UseRedirectIfLoggedIn";

export function RegisterPage() {
    UseRedirectIfLoggedIn();
    const navigator = useNavigate();
    const model = {
        FirstName: '',
        LastName: '',
        Email: '',
        BirthDate: '',
        Password: '',
        ConfirmPassword: ''
    };
    const [registerModel, setRegisterModel] = useState(model);
    const [formValid, setFormValid] = useState(true);
    const [reveal, setReveal] = useState(false);
    const [errResp, setErrResp] = useState(null);

    const submitRegistration = async (e) => {
        e.preventDefault();
        setErrResp(null);
        if (!registerModel.FirstName ||
            !registerModel.LastName ||
            !registerModel.Email ||
            !registerModel.Password ||
            !registerModel.ConfirmPassword) {
            setFormValid(false);
            return;
        }
        if (registerModel.ConfirmPassword !== registerModel.Password) {
            setFormValid(false);
            setErrResp("Passwords don't match");
            return;
        }
        setFormValid(true);
        setReveal(true);
        await sendRegisterRequest(registerModel);
    }

    const sendRegisterRequest = async (registerModel) => {
        try {
            const userService = new UserService();
            const response = await userService.registerUser(registerModel);
            console.log();
            setReveal(false);
            return navigator('/success');
        } catch (err) {
            setReveal(false);
            setErrResp(err.response.data);
            setFormValid(false);
        }
    }
    return (
        <div className={'login-page'}>
            <p className={'sedc-logo'}>WebScraper</p>
            <h4><i className="bi bi-lock-fill"></i>Sign In</h4>
            <form onSubmit={submitRegistration}>
                <div className={'form-row'}>
                    <input type={'text'} value={registerModel.FirstName} placeholder={'First Name'} onChange={(e) => {
                        setRegisterModel({...registerModel, FirstName: e.target.value});
                    }}/>
                </div>
                <div className={'form-row'}>
                    <input type={'text'} value={registerModel.LastName} placeholder={'Last Name'} onChange={(e) => {
                        setRegisterModel({...registerModel, LastName: e.target.value});
                    }}/>
                </div>
                <div className={'form-row'}>
                    <input type={'text'} value={registerModel.Email} placeholder={'Email'} onChange={(e) => {
                        setRegisterModel({...registerModel, Email: e.target.value});
                    }}/>
                </div>
                <div className={'form-row'}>
                    <input type={'date'} value={registerModel.BirthDate} placeholder={'Birth Date'} onChange={(e) => {
                        setRegisterModel({...registerModel, BirthDate: e.target.value});
                    }}/>
                </div>
                <div className={'form-row'}>
                    <input type={'password'} value={registerModel.Password} placeholder={'Password'} onChange={(e) => {
                        setRegisterModel({...registerModel, Password: e.target.value})
                    }}/>
                </div>
                <div className={'form-row'}>
                    <input type={'password'} value={registerModel.ConfirmPassword} placeholder={'Confirm Password'}
                           onChange={(e) => {
                               setRegisterModel({...registerModel, ConfirmPassword: e.target.value})
                           }}/>
                </div>
                <div className={'form-row d-grid'}>
                    <button className={'btn btn-primary'}>Login</button>
                    <Link className={'helper-link'} to={'/login'}>Already have account? sign in here</Link>
                </div>
                <div className={!formValid ? 'validation-errors visible' : 'validation-errors'}>
                    <i className="bi bi-x-octagon"></i> {errResp ?? 'All fields are required'}
                </div>
            </form>
            <Spinner reveal={reveal}/>
        </div>
    );
}