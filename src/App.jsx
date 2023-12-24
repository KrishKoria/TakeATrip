import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Users} from "./users/pages/users.jsx";
import {NewPlace} from "./places/pages/NewPlace.jsx";
import {MainNavigation} from "./shared/components/Navigation/MainNavigation.jsx";
import {UserPlaces} from "./places/pages/UserPlaces.jsx";
import {UpdatePlace} from "./places/pages/UpdatePlace.jsx";
import {Authenticate} from "./users/pages/Authenticate.jsx";
import {authContext} from "./shared/components/Util/Context/auth-context.jsx";
import {useState, useCallback} from "react";
import React from "react";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(false);

    const login = useCallback((uid) => {
        setIsLoggedIn(true);
        setUserId(uid)
    }, [])
    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUserId(null)
    }, [])

    let routes;
    if (isLoggedIn) {
        routes = (
            <Routes>
                <Route path="/" element={<Users/>}/>
                <Route path="/:userId/places" element={<UserPlaces/>}/>
                <Route path="/places/new" element={<NewPlace/>}/>
                <Route path="/places/:placeid" element={<UpdatePlace/>}/>
                <Route path="*" element={<Navigate to='/' replace/>}/>
            </Routes>
        )
    } else {
        routes = (
            <Routes>
                <Route path="/" element={<Users/>}/>
                <Route path="/:userId/places" element={<UserPlaces/>}/>
                <Route path="/auth" element={<Authenticate/>}/>
                <Route path="*" element={<Navigate to='/auth' replace/>}/>
            </Routes>
        )
    }
    return (
        <authContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout, userId: userId}}>
            <BrowserRouter>
                <MainNavigation/>
                <main>
                    {routes}
                </main>
            </BrowserRouter>
        </authContext.Provider>
    )
}

export default App;
