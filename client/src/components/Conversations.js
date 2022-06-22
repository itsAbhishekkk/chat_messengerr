import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";
import AddContact from "./AddContact";
import AddConversations from "./AddConversations";
export default function Contacts() {
  const { contacts } = useContacts();
  const { conversations, selectedConversationIndex } = useConversations();
  const to_be_displayed = () => {
    if (conversations.length === 0) {
      return (
        <>
          <div className="text-2xl font-bold">No Conversations</div>
          <AddConversations />
        </>
      );
    }
    return (
      <>
        <div className="border-4 border-gray-300 max-h-80 overflow-auto rounded-lg">
          <ListGroup variant="flush" >
            {conversations.map((x, index) => (
              <div className="m-2">
              <ListGroup.Item
                key={index}
                className="text-base lg:text-xl text-center list-group-item"
                action
                onClick={() => selectedConversationIndex(index)}
                active={x.selected}
              >
                {x.recipients.map((recipient) => recipient.name).join(", ")}
              </ListGroup.Item>
              </div>
            ))}
          </ListGroup>
        </div>
        <AddConversations />
      </>
    );
  };

  return <div>{to_be_displayed()}</div>;
}
