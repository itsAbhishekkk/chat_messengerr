import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import AddContact from "./AddContact";
export default function Contacts() {
  const { contacts } = useContacts();
  const to_be_displayed = () => {
    if (contacts.length === 0) {
      return (
        <>
          <div className="text-2xl font-bold">No Contacts</div>
          <AddContact />
        </>
      );
    }
    return (
      <>
      <div className=" border-4 border-gray-300 max-h-80 overflow-auto rounded-lg ">
        <ListGroup variant="flush">
          {contacts.map((x) => {
            return (
              <ListGroup.Item key={x.id} className="text-lg">
                <span>{x.name}</span>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
        </div>
        <AddContact />
      </>
    );
  };

  return <div>{to_be_displayed()}</div>;
}
