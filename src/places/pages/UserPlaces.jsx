import {PlaceList} from "../components/PlaceList.jsx";
import {useParams} from "react-router-dom";
import {useHttpHook} from "../../shared/components/Util/Hooks/http-hook.jsx";
import {useEffect, useState} from "react";
import React from "react";
import {ErrorModal} from "../../shared/components/UIElements/ErrorModal.jsx";
import {LoadingSpinner} from "../../shared/components/UIElements/LoadingSpinner.jsx";

export const UserPlaces = () => {
    const userId = useParams().userId;
    const {loading, error, sendRequest, clearError} = useHttpHook();
    const [loadedPlaces, setLoadedPlaces] = useState();
    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
                setLoadedPlaces(response.places);
            } catch (e) {
            }
        }
        fetchPlaces();
    }, [sendRequest, userId]);

    const deletePlaceHandler = (deletedPlaceId) => {
        setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
    }
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {loading && (
                <div className="center">
                    <LoadingSpinner asOverlay={true}/>
                </div>
            )}
            {!loading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={deletePlaceHandler} userId={userId}/>}
        </React.Fragment>
    )
};