import React from "react";
import "./Modal.css";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop.jsx";
import {CSSTransition} from "react-transition-group";

const ModalOverlay = (props) => {
    const content = (
        <div className={`modal ${props.className}`} style={props.style}>
            <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>
            {/*<form onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}>
            Don't Understand Why,But Keeping This makes the font change on website when Map Modal is Closed*/}
            <form>
                <div className={`modal__content ${props.contentClass}`}>
                    {props.children}
                </div>
                <footer className={`modal__footer ${props.footerClass}`}>
                    {props.footer}
                </footer>
            </form>
        </div>
    )
    return ReactDOM.createPortal(content, document.getElementById("modal"))
}
export const Modal = (props) => {
    return (
        <React.Fragment>
            {props.show && <Backdrop onClick={props.onCancel}/>}
            <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames="modal">
                <ModalOverlay {...props}/>
            </CSSTransition>
        </React.Fragment>
    )
}

