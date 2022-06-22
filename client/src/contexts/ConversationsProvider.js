import React, { Component, useState, useContext, useEffect ,useCallback} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";
const ConversationsContext = React.createContext();
export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }){
  const [conversations, setConversations] = useLocalStorage(
    "Conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts();
  const socket = useSocket();
  function createConversation(recipients) {
    setConversations((pre) => [...pre, { recipients, messages: [] }]);
  }

  const AddMessageToConversation = useCallback(({ recipients, text, sender }) => {
    setConversations(prevConversations => {
      let madeChange = false
      const newMessage = { sender, text }
      const newConversations = prevConversations.map(conversation => {
        if (arrayEqual(conversation.recipients, recipients)) {
          madeChange = true
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage]
          }
        }

        return conversation
      })

      if (madeChange) {
        return newConversations
      } else {
        return [
          ...prevConversations,
          { recipients, messages: [newMessage] }
        ]
      }
    })
  }, [setConversations])


useEffect(()=>{
  if(!socket) return;
  socket.on("receive-message", AddMessageToConversation);
  return ()=> socket.off("receive-message");
},[socket,AddMessageToConversation]);

  function sendMessage(recipients, text) {
   socket.emit("send-message",{recipients, text});
    AddMessageToConversation({ recipients, text, sender: id });
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((x) => {
        return x.id === recipient;
      });
      const name = contact ? contact.name : recipient;
      return { id: recipient, name };
    });

    const messages = conversation.messages.map((message)=>{
      const contact = contacts.find((x) => {
        return x.id === message.sender;
      });
      const name = contact ? contact.name : message.sender;
      const fromMe = message.sender===id;
      return {...message,senderName:name,fromMe};
    })

    const selected = index === selectedConversationIndex ? true : false;
    return { ...conversation,messages, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    selectedConversationIndex: setSelectedConversationIndex,
    sendMessage,
    selectedConversation: formattedConversations[selectedConversationIndex],
    createConversation,
  };
  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};

function arrayEqual(a, b){
  if (a.length !== b.length) {
    return false;
  }
  a.sort();
  b.sort();
  return a.every((x, i) =>{ return x=== b[i]});
};


