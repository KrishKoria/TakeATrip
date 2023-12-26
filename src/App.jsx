import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Users} from "./users/pages/users.jsx";
import {NewPlace} from "./places/pages/NewPlace.jsx";
import {MainNavigation} from "./shared/components/Navigation/MainNavigation.jsx";
import {UserPlaces} from "./places/pages/UserPlaces.jsx";
import {UpdatePlace} from "./places/pages/UpdatePlace.jsx";
import {Authenticate} from "./users/pages/Authenticate.jsx";
import {authContext} from "./shared/components/Util/Context/auth-context.jsx";
import React from "react";
import {useAuthHook} from "./shared/components/Util/Hooks/Auth-Hook.jsx";
const App = () => {
    const {token, login, logout, userId} = useAuthHook();
    let routes;
    if (token) {
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
        <authContext.Provider value={{isLoggedIn: !!token, token: token, login: login, logout: logout, userId: userId}}>
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
