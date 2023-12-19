import "./PlaceForm.css"
import {useParams} from "react-router-dom";
import {Input} from "../../shared/components/FormElements/Input.jsx";
import Button from "../../shared/components/FormElements/Button.jsx";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/components/Util/validators.jsx";

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
        title: 'Empire State Building',
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
    const placeId = useParams().placeid;
    const loadedPlace = DUMMY_PLACES.find((place) => place.id === placeId);
    if (!loadedPlace) {
        return (
            <div className="center">
                <h2>Could not find place!</h2>
            </div>
        )
    }

    return (
        <form className={"place-form"}>
            <Input id="title" element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                   errorText="Please enter a valid title." onInput={() => {
            }} value={loadedPlace.title} valid={true}/>
            <Input id="description" element="textarea" label="Description" validators={[VALIDATOR_MINLENGTH(5)]}
                   errorText="Please enter a valid description." onInput={() => {
            }} value={loadedPlace.description} valid={true}/>
            <Button type="submit" disabled={true}>UPDATE PLACE</Button>
        </form>
    )
}