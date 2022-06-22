import React, { Component, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
const AddContact = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [contactName, setContactName] = useState("");
  const [contactId, setContactId] = useState("");

  const { createContact } = useContacts();

  const handleSubmit = (e) => {
    e.preventDefault();
    createContact(contactId, contactName);
    setContactId("");
    setContactName("");
  };
  return (
    <>
      <div className="flex-col flex flex-wrap mt-4 mb-4">
        <Button variant="primary" className="text-2xl bg-sky-500" onClick={handleShow}>
          New Contact
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Contact's ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contact's id"
                value={contactId}
                onChange={(e) => setContactId(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your id with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact's Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter contact's name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" className="text-2xl bg-sky-500" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="text-2xl bg-sky-500" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" className="text-2xl bg-sky-500" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddContact;
