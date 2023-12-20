import "./PlaceForm.css"
import {useParams} from "react-router-dom";
import {Input} from "../../shared/components/FormElements/Input.jsx";
import Button from "../../shared/components/FormElements/Button.jsx";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/components/Util/validators.jsx";
import {useForm} from "../../shared/components/Util/Hooks/Form-hook.jsx";
import {useEffect, useState} from "react";
import {Card} from "../../shared/components/UIElements/Card.jsx";

const DUMMY_PLACES = [{
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg/1200px-Empire_State_Building_from_the_Top_of_the_Rock.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
        lat: 40.7484405,
        lng: -73.9878531
    },
    creator: 'u1'
},
    {
        id: 'p2',
        title: 'Empire.. State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg/1200px-Empire_State_Building_from_the_Top_of_the_Rock.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878531
        },
        creator: 'u2'
    }];

export const UpdatePlace = () => {
    const [isLoading, setIsLoading] = useState(true)
    const placeId = useParams().placeid;
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

    const loadedPlace = DUMMY_PLACES.find((place) => place.id === placeId);

    useEffect(() => {
        if (loadedPlace) {
            setFormData({
                title: {
                    value: loadedPlace.title,
                    isValid: true
                },
                description: {
                    value: loadedPlace.description,
                    isValid: true
                }
            }, true)
        }
        setIsLoading(false)
    }, [setFormData, loadedPlace])

    const updateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); // send this to the backend!
    }

    if (!loadedPlace) {
        return (
            <div className="center">
                <Card className={"place-form"}><h2>Could Not Find Place!</h2></Card>
            </div>

        )
    }
    if (isLoading) {
        return (
            <div className="center">
                <Card className={"place-form"}><h2>Loading...</h2></Card>
            </div>
        )
    }
    return (
        <form className={"place-form"} onSubmit={updateSubmitHandler}>
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
        </form>
    )
}