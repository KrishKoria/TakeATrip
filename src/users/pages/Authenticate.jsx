import {Input} from "../../shared/components/FormElements/Input.jsx";
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/components/Util/validators.jsx";
import Button from "../../shared/components/FormElements/Button.jsx";
import React from "react";
import "./Auth.css"
import {Card} from "../../shared/components/UIElements/Card.jsx";
import {useForm} from "../../shared/components/Util/Hooks/Form-hook.jsx";
import {useState, useContext} from "react";
import {authContext} from "../../shared/components/Util/Context/auth-context.jsx";

export const Authenticate = () => {
    const auth = useContext(authContext);
    const signupMsg = "Don't Have an Account, SIGNUP here";
    const loginMsg = "Already Have an Account, LOGIN here";
    const [isLoginMode, setIsLoginMode] = useState(true);
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

    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    }
    const switchHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        }else {
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
    return (
        <Card className={"authentication"}>
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
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid password(Atleast 5 characters)."
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? "LOGIN" : "SIGNUP"}</Button>
            </form>
            <Button inverse onClick={switchHandler}>{isLoginMode ? signupMsg : loginMsg}</Button>
        </Card>
    );
}