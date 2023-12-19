import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Users} from "./users/pages/users.jsx";
import {NewPlace} from "./places/pages/NewPlace.jsx";
import {MainNavigation} from "./shared/components/Navigation/MainNavigation.jsx";
import {UserPlaces} from "./places/pages/UserPlaces.jsx";
import {UpdatePlace} from "./places/pages/UpdatePlace.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <MainNavigation/>
            <main>
                <Routes>
                    <Route path="/" element={<Users/>}/>
                    <Route path="*" element={<Navigate to='/' replace/>}/>
                    <Route path="/places/new" element={<NewPlace/>}/>
                    <Route path="/:userId/places" element={<UserPlaces/>}/>
                    <Route path="/places/:placeid" element={<UpdatePlace/>}/>
                </Routes>
            </main>
        </BrowserRouter>
    )
}

export default App;
