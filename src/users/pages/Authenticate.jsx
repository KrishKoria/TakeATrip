import {Input} from "../../shared/components/FormElements/Input.jsx";
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/components/Util/validators.jsx";
import Button from "../../shared/components/FormElements/Button.jsx";
import React from "react";
import "./Auth.css"
import {Card} from "../../shared/components/UIElements/Card.jsx";
import {useForm} from "../../shared/components/Util/Hooks/Form-hook.jsx";
import {useState, useContext} from "react";
import {authContext} from "../../shared/components/Util/Context/auth-context.jsx";
import axios from "axios";
import {ErrorModal} from "../../shared/components/UIElements/ErrorModal.jsx";
import {LoadingSpinner} from "../../shared/components/UIElements/LoadingSpinner.jsx";

export const Authenticate = () => {
    const auth = useContext(authContext);
    const signupMsg = "Don't Have an Account, SIGNUP here";
    const loginMsg = "Already Have an Account, LOGIN here";
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const authSubmitHandler = async event => {
        event.preventDefault();
        setLoading(true);
        if (isLoginMode) {
            const loginData = {
                email: formState.inputs.email.value,
                password: formState.inputs.password.value
            };
            try {
                await axios.post('http://localhost:5000/api/users/login', loginData, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                setLoading(false);
                auth.login();
            } catch (err) {
                setLoading(false);
                setError(err.response.data.message || 'Something went wrong, please try again later.');
            }

        } else {
            const signUpData = {
                name: formState.inputs.name.value,
                email: formState.inputs.email.value,
                password: formState.inputs.password.value
            };
            try {
                await axios.post('http://localhost:5000/api/users/signup', signUpData, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                setLoading(false);
                auth.login();
            } catch (err) {
                setLoading(false);
                setError(err.response.data.message || 'Something went wrong, please try again later.');
            }
        }
    }
    const switchHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode)
    }
    const errorHandler = () => {
        setError(null);
    }
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler}/>
            {/*<div className={"center"}>*/}
            {/*    <AuthForm*/}
            {/*        loading={loading}*/}
            {/*        error={error}*/}
            {/*        isLoginMode={isLoginMode}*/}
            {/*        switchHandler={switchHandler}*/}
            {/*        authSubmitHandler={authSubmitHandler}*/}
            {/*        inputHandler={inputHandler}*/}
            {/*        formState={formState}*/}
            {/*        signupMsg={signupMsg}*/}
            {/*        loginMsg={loginMsg}*/}
            {/*    />*/}
            {/*</div>*/}
            <Card className={"authentication"}>
                {loading && <LoadingSpinner asOverlay={true}/>}
                <form className={"place-form"} onSubmit={authSubmitHandler}>
                    <h2>Login Required</h2>
                    <hr/>
                    <br/>
                    {!isLoginMode && <Input
                        id="name"
                        element="input"
                        label="Your Name"
                        type="text"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a name."
                        onInput={inputHandler}/>
                    }
                    <Input
                        id="email"
                        element="input"
                        label="Email"
                        type="email"
                        validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid email."
                        onInput={inputHandler}
                    />
                    <Input
                        id="password"
                        element="input"
                        label="Password"
                        type="password"
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
                        errorText="Please enter a valid password(Atleast 6 characters)."
                        onInput={inputHandler}
                    />
                    <Button type="submit"
                            disabled={!formState.isValid}>{isLoginMode ? "LOGIN" : "SIGNUP"}</Button>
                </form>
                <Button inverse onClick={switchHandler}>{isLoginMode ? signupMsg : loginMsg}</Button>
            </Card>
        </React.Fragment>
    );
}