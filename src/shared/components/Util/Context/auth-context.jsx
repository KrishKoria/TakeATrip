import {createContext} from "react";

export const authContext = createContext({
    isLoggedIn: false,
    userId: null,
    login: () => {},
    logout: () => {}
})