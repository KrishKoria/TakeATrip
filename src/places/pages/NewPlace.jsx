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
import {ImageUpload} from "../../shared/components/FormElements/ImageUpload.jsx";

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
        },
        image: {
            value: null,
            isValid: false
        }
    }, false);
    const navigate = useNavigate();
    const placeSubmitHandler = async event => {
        event.preventDefault();
        try {
            const newPlaceData = new FormData();
            newPlaceData.append("title", formState.inputs.title.value)
            newPlaceData.append("description", formState.inputs.description.value)
            newPlaceData.append("address", formState.inputs.address.value)
            newPlaceData.append("image", formState.inputs.image.value)
            await sendRequest(import.meta.env.VITE_BACKEND_URL + '/places', "POST", newPlaceData, {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + auth.token
            });
            navigate('/');
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
                <ImageUpload id="image" onInput={inputHandler} errorText="Please provide an image."/>
                <Button type="submit" disabled={!formState.isValid}>
                    ADD PLACE
                </Button>
            </form>
        </React.Fragment>
    );
};
