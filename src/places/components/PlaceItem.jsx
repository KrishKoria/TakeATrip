import React from "react";
import "./PlaceItem.css"
import {Card} from "../../shared/components/UIElements/Card.jsx";
import Button from "../../shared/components/FormElements/Button.jsx";
import {useState} from "react";
import {Modal} from "../../shared/components/UIElements/Modal.jsx";
import {Map} from "../../shared/components/UIElements/map.jsx";
import {useContext} from "react";
import {authContext} from "../../shared/components/Util/Context/auth-context.jsx";
import {useHttpHook} from "../../shared/components/Util/Hooks/http-hook.jsx";
import {ErrorModal} from "../../shared/components/UIElements/ErrorModal.jsx";
import {LoadingSpinner} from "../../shared/components/UIElements/LoadingSpinner.jsx";
export const PlaceItem = (props) => {
    const auth = useContext(authContext);
    const {loading, error, sendRequest, clearError} = useHttpHook();
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);
    const showDeleteWarningHandler = () => setShowConfirmModal(true);
    const cancelDeleteHandler = () => setShowConfirmModal(false);
    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try {
            await sendRequest(`http://localhost:5000/api/places/${props.id}`, "DELETE");
            props.onDelete(props.id);
        }   catch (err) {
        }
    };
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <Modal show={showMap} onCancel={closeMapHandler} header={props.address}
                   contentClass={"place-item__modal-content"} footerClass={"place-item__modal-actions"}
                   footer={<Button onClick={closeMapHandler}>CLOSE</Button>}>
                <div className={"map-container"}>
                    <Map center={props.coordinates} zoom={16}/>
                </div>
            </Modal>
            <Modal show={showConfirmModal} onCancel={cancelDeleteHandler} header={"Delete Location"} footerClass={"place-item__modal-actions"} footer={
                <React.Fragment>
                    <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                    <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                </React.Fragment>
            }>
                <h2>Are you sure?, This Cannot Be Undone!!</h2>
            </Modal>
            <li className={"place-item"}>
                <Card className={"place-item__content"}>
                    {loading && <LoadingSpinner asOverlay={true}/>}
                    <div className={"place-item__image"}>
                        <img src={`http://localhost:5000/${props.image}`} alt={props.title}/>
                    </div>
                    <div className={"place-item__info"}>
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className={"place-item__actions"}>
                        <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                        {auth.userId === props.creatorId && (
                        <Button to={`/places/${props.id}`}>EDIT</Button>
                        )}
                        {auth.userId === props.creatorId && (
                        <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
                        )}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )
};