import React from "react";
import {useState} from "react";
import "./MainNavigation.css"
import {MainHeader} from "./MainHeader.jsx";
import {Link} from "react-router-dom";
import {NavLinks} from "./Navlinks.jsx";
import {SideDrawer} from "./SideDrawer.jsx";
import Backdrop from "../UIElements/Backdrop.jsx";

export const MainNavigation = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    }
    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    }
    return (
        <React.Fragment>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className={"main-navigation__drawer-nav"}>
                    <NavLinks/>
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                    <span/>
                    <span/>
                    <span/>
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/">Take A Trip</Link>
                </h1>
                <nav className={"main-navigation__header-nav"}>
                    <NavLinks/>
                </nav>
            </MainHeader>
        </React.Fragment>
    )
}