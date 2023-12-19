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
                    <Route path="/Take-A-Trip/" element={<Users/>}/>
                    <Route path="*" element={<Navigate to='/Take-A-Trip/' replace/>}/>
                    <Route path="/Take-A-Trip/places/new" element={<NewPlace/>}/>
                    <Route path="/Take-A-Trip/:userId/places" element={<UserPlaces/>}/>
                    <Route path="/Take-A-Trip/places/:placeid" element={<UpdatePlace/>}/>
                </Routes>
            </main>
        </BrowserRouter>
    )
}

export default App;
