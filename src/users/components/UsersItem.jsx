import "./UsersItem.css"
import {Avatar} from "../../shared/components/UIElements/Avatar.jsx";
import {Link} from "react-router-dom";
import Card from "../../shared/components/UIElements/Card.jsx";

export const UsersItem = (props) => {
    return (
        <li className={"user-item"}>
            <Card className={"user-item__content"}>
                <Link to={`/Take-A-Trip/${props.id}/places`}>
                    <div className={"user-item__image"}>
                        <Avatar image={props.image} alt={props.name}/>
                    </div>
                    <div className={"user-item__info"}>
                        <h2>{props.name}</h2>
                        <h3>{props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}</h3>
                    </div>
                </Link>
            </Card>
        </li>)
}