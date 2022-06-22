import React, { Component, useState, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ContactsContext = React.createContext();
export function useContacts() {
  return useContext(ContactsContext);
}

const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  function createContact(id, name) {
    setContacts((pre) => [...pre, { id, name }]);
  }


  return (
    <ContactsContext.Provider value={{contacts, createContact}}>
      {children}
    </ContactsContext.Provider>
  );
};
export default ContactsProvider;
