import React, { Component, useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ContactsProvider from "./contexts/ContactsProvider";
import {ConversationsProvider} from "./contexts/ConversationsProvider";
import { SocketProvider } from "./contexts/SocketProvider";
import useLocalStorage from "./hooks/useLocalStorage"
function App() {
  const [ID, setID] = useLocalStorage("id");
  const dashboard = (
    <SocketProvider id={ID}>
      <ContactsProvider>
        <ConversationsProvider id={ID}>
          <Dashboard id={ID} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );
  return <>{ID ? dashboard : <Login onSetID={setID} />}</>;
}
export default App;
