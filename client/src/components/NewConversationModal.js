import React, { useRef } from 'react'
import { Modal, Form } from 'react-bootstrap'

export default function NewConversationModal() {
    const idRef = useRef()
    const nameRef = useRef()
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Modal.Header closeButton>
                Create Conversation
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Id:</Form.Label>
                        <Form.Control type="text" ref={idRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Id:</Form.Label>
                        <Form.Control type="text" ref={nameRef} required></Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </>
    )
}
