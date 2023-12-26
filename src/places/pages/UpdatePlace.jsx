import "./PlaceForm.css"
import {useNavigate, useParams} from "react-router-dom";
import {Input} from "../../shared/components/FormElements/Input.jsx";
import Button from "../../shared/components/FormElements/Button.jsx";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/components/Util/validators.jsx";
import {useForm} from "../../shared/components/Util/Hooks/Form-hook.jsx";
import {useEffect, useState} from "react";
import {Card} from "../../shared/components/UIElements/Card.jsx";
import {useHttpHook} from "../../shared/components/Util/Hooks/http-hook.jsx";
import {LoadingSpinner} from "../../shared/components/UIElements/LoadingSpinner.jsx";
import {ErrorModal} from "../../shared/components/UIElements/ErrorModal.jsx";
import React from "react";
import {authContext} from "../../shared/components/Util/Context/auth-context.jsx";
import {useContext} from "react";

export const UpdatePlace = () => {
    const auth = useContext(authContext);
    const placeId = useParams().placeid;
    const {loading, error, sendRequest, clearError} = useHttpHook();
    const [loadedPlace, setLoadedPlace] = useState();
    const navigate = useNavigate();
    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false)
    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const response = await sendRequest(`${import.meta.env.VITE_BACKEND_URL}/places/${placeId}`);
                setLoadedPlace(response.place);
                setFormData({
                    title: {
                        value: response.place.title,
                        isValid: true
                    },
                    description: {
                        value: response.place.description,
                        isValid: true
                    }
                }, true)
            } catch (e) {
            }
        }
        fetchPlace();
    }, [sendRequest, placeId], setFormData);

    const updateSubmitHandler = async event => {
        event.preventDefault();
        try {
            const updateData = {
                title: formState.inputs.title.value,
                description: formState.inputs.description.value
            }
            await sendRequest(`${import.meta.env.VITE_BACKEND_URL}/places/${placeId}`, "PATCH", updateData, {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            });
            navigate(`/${auth.userId}/places`);
        } catch (err) {

        }
    }
    if (loading) {
        return (
            <div className="center">
                <LoadingSpinner asOverlay={true}/>
            </div>
        )
    }

    if (!loadedPlace && !error) {
        return (
            <div className="center">
                <Card className={"place-form"}><h2>Could Not Find Place!</h2></Card>
            </div>

        )
    }
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {!loading && loadedPlace && (<form className={"place-form"} onSubmit={updateSubmitHandler}>
                <Input id="title" element="input" type="text" label="Title"
                       validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                       errorText="Please enter a valid title." onInput={inputHandler}
                       initialValue={formState.inputs.title.value}
                       initialValid={formState.inputs.title.isValid}/>
                <Input id="description" element="textarea" label="Description" validators={[VALIDATOR_MINLENGTH(5)]}
                       errorText="Please enter a valid description." onInput={inputHandler}
                       initialValue={formState.inputs.description.value}
                       initialValid={formState.inputs.description.isValid}/>
                <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
            </form>)}
        </React.Fragment>
    )
}