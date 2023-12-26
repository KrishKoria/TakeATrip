import {UsersList} from "../components/UsersList.jsx";
import {useEffect, useState} from "react";
import React from "react";
import {ErrorModal} from "../../shared/components/UIElements/ErrorModal.jsx";
import {LoadingSpinner} from "../../shared/components/UIElements/LoadingSpinner.jsx";
import {useHttpHook} from "../../shared/components/Util/Hooks/http-hook.jsx";
export const Users = () => {
    const [USERS, setUSERS] = useState([]);
    const {loading, error, sendRequest, clearError} = useHttpHook();
    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await sendRequest(import.meta.env.VITE_BACKEND_URL+'/users')
                setUSERS(response.users)
            } catch (err) {
            }
        }
        getUsers();
    }, [sendRequest]);
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {loading && (
                <div className="center">
                    <LoadingSpinner asOverlay={true}/>
                </div>
            )}
            <UsersList items={USERS}/>
        </React.Fragment>
    )
}

