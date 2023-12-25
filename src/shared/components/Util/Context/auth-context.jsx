import {createContext} from "react";

export const authContext = createContext({
    token: null,
    isLoggedIn: false,
    userId: null,
    login: () => {},
    logout: () => {}
})