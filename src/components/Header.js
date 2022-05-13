import React, {useState} from 'react';
import DropdownList from "./DropdownList";
import {Link} from 'react-router-dom';
import Logo from "../assets/images/logo/logo.svg";
import RightSide from "./RightSide";


const Header = ({ cartCount, setCartCount }) => {
    const [window, setWindow] = useState('');
    const token = localStorage.getItem('token');

    const handleEnter = (window) => {
        setWindow(window)
    }

    const handleLeave = () => {
        setWindow('')
    }


    return (
        <div>
            <div className="header-area header-area--default bg-white">
                <header className="header-area   header-sticky">
                    <div className="container-fluid container-fluid--cp-100">
                        <div className="row">
                            <div className="col-lg-12 d-none d-md-block">
                                <div className="top-logo-area">
                                    <div className="logo text-md-center">
                                        <Link to='/'>
                                            <img src={Logo} alt=""/>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center pt-3 pb-3">
                            <div className="col-lg-3 col-lg-3 col-6">
                                <div className="header-left-side text-end">
                                    <div className="header-right-items content__hidden d-none d-md-block">
                                        <a href="#" className=""><span className="phone-number font-lg-p"> <i
                                            className="icon-telephone"/> +8 (268) 654 - 587 - 68 </span></a>
                                    </div>
                                </div>
                                <div className="logo__hidden text-start">
                                    <a href="#"><img src="../assets/images/logo/logo.svg" alt=""/></a>
                                </div>
                            </div>
                            <div className="col-lg-6 col-lg-6  d-none d-lg-block">
                                <div className="header__navigation d-none d-lg-block">
                                    <nav className="navigation-menu">
                                        <ul className="justify-content-center">
                                            <li className="has-children has-children--multilevel-submenu">
                                                <Link to='/'><span>Home</span></Link>
                                            </li>
                                            <li className="has-children has-children--multilevel-submenu"
                                                onMouseLeave={handleLeave}
                                                onMouseEnter={() => handleEnter('open1')}>
                                                <a href="#"><span>Shop</span></a>
                                                <ul className="submenu">
                                                    <DropdownList
                                                        open={window === 'open1'}
                                                        list={['Shop Online', 'Cart', 'Wishlist',]}/>
                                                </ul>
                                            </li>
                                            <li className="has-children has-children--multilevel-submenu"
                                                onMouseLeave={handleLeave}
                                                onMouseEnter={() => handleEnter('open2')}>
                                                <a href="#"><span>About</span></a>
                                                <ul className="submenu">
                                                    <DropdownList
                                                        open={window === 'open2'}
                                                        list={['About Us', 'Contact']}
                                                    />
                                                </ul>
                                            </li>
                                            <li className="has-children has-children--multilevel-submenu">
                                                <Link to={token ? "/my_account" : '/'}><span>Account</span></Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <RightSide cartCount={cartCount} setCartCount={setCartCount}/>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}

export default Header;


