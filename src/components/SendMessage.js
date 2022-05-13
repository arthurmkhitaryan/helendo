import React, {useState} from 'react';
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {ContactRequest} from "../store/actions/contact";

function SendMessage(props) {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const data = useSelector(store => store.contact.data);

    const handleChange = (ev, key) => {
        _.unset(errors, key)
        _.set(formData, key, ev.target.value)
        setErrors({...errors})
        setFormData({...formData});

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(ContactRequest(formData, (err, data) => {
            if (err) {
                console.log(data)
                setErrors(data.errors || {});
            }
            _.set(props, props.open, false)
        }));
    }
    return (
        <div className="col-lg-7">
            <div className="contact-form-wrap  section-space--mt_60">
                <h5 className="mb-10">Get in touch</h5>
                <p>Write us a letter</p>
                  {!(_.isEmpty(data)) ? <span className='reg-text'>{data.status}</span> : null}
                <form id="contact-form" className="mt-30"
                      action="https://hasthemes.com/file/mail.php" method="post">
                    <div className="contact-form">
                        <div className="contact-input">
                            <div className="contact-inner">
                                <input name="con_name" type="text" placeholder="Name *"
                                       onChange={(ev) => handleChange(ev, 'name')}/>
                            </div>
                            <div className="contact-inner">
                                <input name="con_email" type="email" placeholder="Email *"
                                       onChange={(ev) => handleChange(ev, 'email')}/>
                            </div>
                        </div>
                        <div className="contact-inner">
                            <input name="con_subject" type="text" placeholder="Subject *"
                                   onChange={(ev) => handleChange(ev, 'subject')}/>
                        </div>
                        <div className="contact-inner contact-message">
                            <textarea name="con_message" placeholder="Please describe what you need."
                                      onChange={(ev) => handleChange(ev, 'message')}/>
                        </div>
                        <div className="submit-btn mt-20">
                            <button className="btn btn--black btn--md"
                                    type="submit" onClick={handleSubmit}>Submit
                            </button>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SendMessage;
