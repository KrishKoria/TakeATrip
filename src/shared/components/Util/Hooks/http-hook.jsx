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
            const response = await axios(method, url, data, headers, {signal: httpAbortCtrl.signal});
            return response.data;
        } catch (err) {
            setError(err.response.data.message || 'Something went wrong, please try again later.');
        }
        setLoading(false)
    }, []);
    const errorHandler = () => {
        setError(null);
    }
    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        }
    },[])
    return {loading, error, sendRequest, errorHandler};
};