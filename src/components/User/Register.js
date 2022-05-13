import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {sentRegisterRequest} from "../../store/actions/users";
import _ from 'lodash'

function Register(props) {
    const [register, setRegister] = useState({});
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const data = useSelector(store => store.users.data);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sentRegisterRequest(register, (err, data) => {
            if (err) {
                setErrors(data.errors);
                return;
            }
        }));
        // props.handleClick('openLogin')
    }

    const handleChange = (ev, key) => {
        _.unset(errors, key)
        setErrors({...errors})
        setRegister({
            ...register,
            [key]: ev.target.value,
        });
    }
    return (
        <div className="tab-pane fade show active" id="tab_list_07" role="tabpanel">
            <form action="#" className="account-form-box">
                <h6>Register An Account</h6>
                {!(_.isEmpty(data)) ? <span className='reg-text'>{data.status}</span> : null}
                <div className="single-input">
                    <input type="text" onChange={(ev) => {
                        handleChange(ev, 'fName')
                    }} placeholder="FirstName"/>
                    {!(_.isEmpty(errors)) ? <span className='error-text'>{errors.fName}</span> : null}
                </div>
                <div className="single-input">
                    <input type="text" onChange={(ev) => {
                        handleChange(ev, 'lName')
                    }} placeholder="LastName"/>
                    {!(_.isEmpty(errors)) ? <span className='error-text'>{errors.lName}</span> : null}
                </div>
                <div className="single-input">
                    <input type="text" onChange={(ev) => {
                        handleChange(ev, 'email')
                    }} placeholder="Email address"/>
                    {!(_.isEmpty(errors)) ? <span className='error-text'>{errors.email}</span> : null}
                </div>
                <div className="single-input">
                    <input type="password" onChange={(ev) => {
                        handleChange(ev, 'password')
                    }} placeholder="Password"/>
                    {!(_.isEmpty(errors)) ? <span className='error-text'>{errors.password}</span> : null}
                </div>

                <div className="button-box mt-25">
                    <button type='submit' className="btn btn--full btn--black"
                            onClick={handleSubmit}>Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
