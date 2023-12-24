import {UsersList} from "../components/UsersList.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import React from "react";
import {ErrorModal} from "../../shared/components/UIElements/ErrorModal.jsx";
import {LoadingSpinner} from "../../shared/components/UIElements/LoadingSpinner.jsx";
export const Users = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [USERS, setUSERS] = useState([]);
    useEffect(() => {
        const sendRequest = async () => {
            setLoading(true)
            try {
                const response = await axios.get('http://localhost:5000/api/users')
                setUSERS(response.data.users)
            } catch (err) {
                setError(err.response.data.message || 'Something went wrong, please try again later.')
            }
            setLoading(false)
        }
        sendRequest();
    }, []);
    const errorHandler = () => {
        setError(null);
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler}/>
            {loading && (
                <div className="center">
                    <LoadingSpinner asOverlay={true}/>
                </div>
            )}
            <UsersList items={USERS}/>
        </React.Fragment>
    )
}

