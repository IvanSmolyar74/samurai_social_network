import React from "react";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = ({isAuth, login, logout}) => {
    const handleClick = () => {
        logout()
    }
    return (
        <header className={s.header}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ9Dw13lAK4nF-A2hZtMRHz4Pj2jm4id9hpQw&usqp=CAU" alt=""/>
            <div className={s.loginBlock}>
                {isAuth ? <div>{login} - <button onClick={handleClick}>Log Out</button></div> : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;