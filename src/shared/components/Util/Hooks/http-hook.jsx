import {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";

export const useHttpHook = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const activeHttpRequests = useRef([]);
    const sendRequest = useCallback(async (url, method = 'GET', data = null, headers = {}) => {
        setLoading(true)
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);
        try {
            console.log(url, method, data, headers)
            const response = await axios({method, url, data, headers, signal: httpAbortCtrl.signal});
            setLoading(false)
            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl);
            return response.data;
        } catch (err) {
            setError(err.response.data.message || 'Something went wrong, please try again later.');
            setLoading(false)
            throw err.response.data.message
        }
    }, []);
    const clearError = () => {
        setError(null);
    }
    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        }
    },[])
    return {loading, error, sendRequest, clearError};
};