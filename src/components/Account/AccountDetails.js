import React, {useEffect, useState} from 'react';
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {getUserRequest, getUserUpdateRequest} from "../../store/actions/users";

function AccountDetails(props) {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [confirm, setConfirm] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(store => store.users.user);
    const update = useSelector(store => store.users.update);

    useEffect(async () => {
        await dispatch(getUserRequest())
    }, [])

    const handleChange = (ev, key) => {
        _.unset(errors, key)
        _.set(formData, key, ev.target.value)
        setErrors({...errors})
        setFormData({...formData});

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.newPassword && formData.newPassword !== confirm) {
            setErrors({error: `Your password isn't the same. Try again.`})
        } else {
            dispatch(getUserUpdateRequest(formData, (err, data) => {
                if (err) {
                    console.log(data)
                    setErrors(data.errors || {});
                }
            }));

        }
    }

    return (
        <>
            <div className="myaccount-content">
                <h3 className="title">Account Details</h3>
                <div className="account-details-form">
                    <form action="#">
                        <div className="row">
                            <div className="col-lg-6">
                                <div
                                    className="single-input-item mb-3">
                                    <label htmlFor="first-name"
                                           className="required mb-1">First Name</label>
                                    <input type="text"
                                           id="first-name"
                                           placeholder={user.fName}
                                           onChange={(ev) => handleChange(ev, 'fName')}/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div
                                    className="single-input-item mb-3">
                                    <label htmlFor="last-name"
                                           className="required mb-1">Last Name</label>
                                    <input type="text"
                                           id="last-name"
                                           placeholder={user.lName}
                                           onChange={(ev) => handleChange(ev, 'lName')}/>
                                </div>
                            </div>
                        </div>
                        <div className="single-input-item mb-3">
                            <label htmlFor="email"
                                   className="required mb-1">Email Address</label>
                            <input type="email" id="email"
                                   readOnly={true}
                                   placeholder={user.email}/>
                        </div>
                        <fieldset>
                            <legend>Password change</legend>
                            <div className="single-input-item mb-3">
                                <label htmlFor="current-pwd"
                                       className="required mb-1">Current Password</label>
                                <input type="password"
                                       id="current-pwd"
                                       placeholder="Current Password"
                                       onChange={(ev) => handleChange(ev, 'password')}/>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div
                                        className="single-input-item mb-3">
                                        <label htmlFor="new-pwd"
                                               className="required mb-1">New Password</label>
                                        <input type="password"
                                               id="new-pwd"
                                               placeholder="New Password"
                                               onChange={(ev) => handleChange(ev, 'newPassword')}/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div
                                        className="single-input-item mb-3">
                                        <label htmlFor="confirm-pwd"
                                               className="required mb-1">Confirm Password</label>
                                        <input type="password"
                                               id="confirm-pwd"
                                               placeholder="Confirm Password"
                                               onChange={(ev) => setConfirm(ev.target.value)}/>
                                        {!(_.isEmpty(errors)) ?
                                            <span className='error-text'>{errors.error}</span> : null}
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div
                            className="single-input-item single-item-button">
                            <button
                                className="btn btn btn-dark btn-hover-primary rounded-0"
                                onClick={handleSubmit}>Save Changes
                            </button>
                            {update? <p className='reg-text'>{update.status}</p> :null}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AccountDetails;

