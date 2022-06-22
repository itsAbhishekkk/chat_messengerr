import React, { Component, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";
const AddConversations = () => {
  const [show, setShow] = useState(false);
  const { contacts } = useContacts();
  const [selectedContacts, setSelectedContacts] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [contactName, setContactName] = useState("");
  const [contactId, setContactId] = useState("");

  const { createConversation } = useConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    createConversation(selectedContacts);
    setSelectedContacts([]);
    handleClose();
  };

  const handleSelect = (id) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter((x) => x !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  return (
    <>
      <div className="flex-col flex flex-wrap mt-4 mb-4">
        <Button variant = "primary" className="text-2xl bg-sky-500" onClick={handleShow}>
          New Conversations
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Selections</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            {contacts.map((x) => {
              return (
                <Form.Group controlId={x.id} key={x.id}>
                  <Form.Check
                    type="checkbox"
                    id={x.id}
                    label={x.name}
                    value={selectedContacts.includes(x.id)}
                    onChange={() => handleSelect(x.id)}
                  />
                </Form.Group>
              );
            })}
            <Button variant="primary" className="text-2xl bg-sky-500" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddConversations;
