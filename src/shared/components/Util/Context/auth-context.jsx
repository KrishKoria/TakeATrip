import {createContext} from "react";

export const authContext = createContext({
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
})