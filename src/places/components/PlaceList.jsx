import "./PlaceList.css"
import {Card} from "../../shared/components/UIElements/Card.jsx";
import {PlaceItem} from "./PlaceItem.jsx";
import Button from "../../shared/components/FormElements/Button.jsx";
import {authContext} from "../../shared/components/Util/Context/auth-context.jsx";
import {useContext} from "react";
export const PlaceList = (props) => {
    const auth = useContext(authContext);
    if (auth.userId === props.userId && props.items.length === 0) {
        return (
            <div className="place-list center">
                <Card>
                    <h2>No places found. Maybe create one?</h2>
                    <Button to="/places/new">Add Place</Button>
                </Card>
            </div>
        )
    }
    if (auth.userId !== props.userId && props.items.length === 0) {
        return (
            <div className="place-list center">
                <Card>
                    <h2>This User Has No Places To Share</h2>
                </Card>
            </div>
        )
    }
    return (
        <ul className="place-list">
            {props.items.map((place) => {
                return (
                    <PlaceItem
                        key={place.id}
                        id={place.id}
                        image={place.image}
                        title={place.title}
                        description={place.description}
                        address={place.address}
                        creatorId={place.creator}
                        coordinates={place.location}
                        onDelete={props.onDeletePlace}
                    />
                )
            })}
        </ul>
    )
};