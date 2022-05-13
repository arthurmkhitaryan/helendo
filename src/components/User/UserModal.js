import React, {Component} from 'react';
import Modal from 'react-modal';
import {Link} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '600px',
        padding: '0 20px',
        zIndex: '100'
    },
};


class UserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            display: 'openLogin',
        }
    }

    handleClick = (display) => {
        this.setState({display, clicked: true})
    }

    render() {
        const {clicked, display} = this.state;
        const {open,handleClose} = this.props;
        const token = localStorage.getItem('token');
        if (!open) {
            return null;
        }
        return (
            <Modal
                isOpen={!token ? open : !open}
                onAfterOpen={() => console.log('modal opened')}
                onRequestClose={handleClose}
                style={customStyles}
                ariaHideApp={false}
                overlayClassName="modalOverlay"
                shouldCloseOnOverlayClick={true}>

                <div className="modal-content">
                    <div className="modal-box-wrapper">
                        <div className="helendo-tabs">
                            <div className='modal-btn'>
                                <button onClick={handleClose}>X</button>
                            </div>
                            <ul className="nav" role="tablist">
                                <li className="tab__item nav-item active" onClick={() => this.handleClick("openLogin")}>
                                    <a className={`nav-link ${clicked && display === "openRegister" ? "nav-link" : "active"}`}
                                       data-bs-toggle="tab" role="tab">Login</a>
                                </li>
                                <li className="tab__item nav-item" onClick={() => this.handleClick("openRegister")}>
                                    <a className={`nav-link ${clicked && display === "openRegister" ? "active" : "nav-link"}`}
                                       data-bs-toggle="tab" role="tab">Our Register</a>
                                </li>

                            </ul>
                        </div>
                        <div className="tab-content content-modal-box">
                            {display === "openLogin" ?
                                <Login open={open} handleClose={handleClose}/>
                                : null}

                            {display === "openRegister" ?
                                <Register handleClick={this.handleClick}/> : null}

                        </div>
                    </div>
                </div>

            </Modal>

        );
    }
}

export default UserModal;
