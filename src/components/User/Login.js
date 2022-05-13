import React, { useState } from 'react';
import { Link } from "react-router-dom";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { loginRequest } from "../../store/actions/users";

function Login(props) {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleChange = (ev, key) => {
        _.unset(errors, key)
        _.set(formData, key, ev.target.value)
        setErrors({ ...errors })
        setFormData({ ...formData });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginRequest(formData, (err, data) => {
            if (err) {
                setErrors(data.errors || {});
            }
        }));
        props.handleClose();
    }

    return (
        <div className="tab-pane fade show active" id="tab_list_06" role="tabpanel">
            <form action="#" className="account-form-box">
                <h6>Login your account</h6>
                <div className="single-input">
                    <input type="text" placeholder="Email"
                           onChange={(ev) => handleChange(ev, 'email')} />
                    {!(_.isEmpty(errors)) ? <span className='error-text'>{errors.email}</span> : null}
                </div>
                <div className="single-input">
                    <input type="password" placeholder="Password"
                           onChange={(ev) => handleChange(ev, 'password')}/>
                    {!(_.isEmpty(errors)) ? <span className='error-text'>{errors.password}</span> : null}
                </div>
                <div className="checkbox-wrap mt-10">
                    <label className="label-for-checkbox inline mt-15">
                        <input className="input-checkbox" name="rememberme" type="checkbox"
                               id="rememberme" value="forever"/> <span>Remember me</span>
                    </label>
                    <a href="#" className=" mt-10">Lost your password?</a>
                </div>
                <div className="button-box mt-25">
                    <a href="#" className="btn btn--full btn--black" onClick={handleSubmit}>Log in</a>
                </div>
                <p className="mt-15">Your personal data will be used to support your experience
                    throughout this website, to manage access to your account, and for other
                    purposes described in our <Link to="/policy">privacy policy</Link>.</p>
            </form>
        </div>
    );
}

export default Login;
