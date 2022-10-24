import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function DeleteModal(props) {
    const baseURL = "http://localhost:3307"
    const [err, setErr] = useState(null)
    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await axios.delete(`${baseURL}/books/${props.id}`)
            window.location.reload()
        } catch (err) {
            setErr(err)
            console.log(err);
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {`Are you sure you want to delete ${props.title}?`}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Deleted book will not be recovered!</h4>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClick}>Delete</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal