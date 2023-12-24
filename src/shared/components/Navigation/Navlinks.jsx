import "./NavLinks.css";
import {NavLink} from "react-router-dom";
import {authContext} from "../Util/Context/auth-context.jsx";
import {useContext} from "react";

export const NavLinks = () => {
    const auth = useContext(authContext);
    return (
        <ul className={"nav-links"}>
            <li>
                <NavLink to={"/"} exact>ALL USERS</NavLink>
            </li>
            {auth.isLoggedIn && (
                <li>
                    <NavLink to={`/${auth.userId}/places`} exact>MY PLACES</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <NavLink to={"/places/new"} exact>ADD PLACE</NavLink>
                </li>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to={"/auth"} exact>AUTHENTICATE YOURSELF</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <button onClick={auth.logout}>LOGOUT</button>
                </li>
            )}
        </ul>
    )
}