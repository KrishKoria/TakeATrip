import "./NavLinks.css";
import {NavLink} from "react-router-dom";
export const NavLinks = () => {
    return (<ul className={"nav-links"}>
            <li>
                <NavLink to={"/"} exact>ALL USERS</NavLink>
            </li>
            <li>
                <NavLink to={"/Take-A-Trip/u1/places"} exact>MY PLACES</NavLink>
            </li>
            <li>
                <NavLink to={"/Take-A-Trip/places/new"} exact>ADD PLACE</NavLink>
            </li>
            <li>
                <NavLink to={"/Take-A-Trip/auth"} exact>AUTHENTICATE YOURSELF</NavLink>
            </li>
        </ul>
    )
}