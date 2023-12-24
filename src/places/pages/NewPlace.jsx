import React, {useContext} from 'react';
import {Input} from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/components/Util/validators.jsx';
import './PlaceForm.css';
import {useForm} from "../../shared/components/Util/Hooks/Form-hook.jsx";
import {useHttpHook} from "../../shared/components/Util/Hooks/http-hook.jsx";
import {authContext} from "../../shared/components/Util/Context/auth-context.jsx";
import {ErrorModal} from "../../shared/components/UIElements/ErrorModal.jsx";
import {LoadingSpinner} from "../../shared/components/UIElements/LoadingSpinner.jsx";
import {useNavigate} from "react-router-dom";

export const NewPlace = () => {
    const {loading, error, sendRequest, clearError} = useHttpHook();
    const auth = useContext(authContext);
    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        }
    }, false);
    const naviate = useNavigate();
    const placeSubmitHandler = async event => {
        event.preventDefault();
        try {
            const newPlaceData = {
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
                address: formState.inputs.address.value,
                creator: auth.userId
            }
            await sendRequest('http://localhost:5000/api/places', "POST", newPlaceData, {'Content-Type': 'application/json'});
            naviate('/');
        } catch (err) {
        }
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <form className="place-form" onSubmit={placeSubmitHandler}>
                {loading && <LoadingSpinner asOverlay={true}/>}
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title."
                    onInput={inputHandler}
                />
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description (at least 5 characters)."
                    onInput={inputHandler}
                />
                <Input
                    id="address"
                    element="input"
                    label="Address"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid address."
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    ADD PLACE
                </Button>
            </form>
        </React.Fragment>
    );
};
