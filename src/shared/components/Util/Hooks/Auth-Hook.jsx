import {useCallback, useEffect, useState} from "react";

let logoutTimer;
export const useAuthHook = () => {
    const [token, setToken] = useState();
    const [userId, setUserId] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState(Date);
    const login = useCallback((uid, token, expirationDate) => {
        setToken(token);
        const tokenDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        localStorage.setItem('userData', JSON.stringify({
            userId: uid,
            token: token,
            expiration: tokenDate.toISOString()
        }))
        setTokenExpirationDate(tokenDate);
        setUserId(uid)
    }, [])
    const logout = useCallback(() => {
        setToken(null);
        localStorage.removeItem('userData');
        setTokenExpirationDate(null);
        setUserId(null)
    }, [])

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
            login(storedData.userId, storedData.token, new Date(storedData.expiration));
        }
    }, [login]);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime)
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate])

    return {token, login, logout, userId}
}