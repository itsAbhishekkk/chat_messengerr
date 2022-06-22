import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";
import OpenConversation from "./OpenConversation";
import Sidebar from "./Sidebar";
import logo from "./chatty.png";
const Dashboard = ({ id }) => {
    const {selectedConversation} = useConversations();
  return (
    <>
    <div className="flex flex-wrap justify-center">
      <div><img src={logo} alt="" width="80px" height="80px" /></div>
      <div className="text-3xl font-bold">Chatty</div>
    </div>
    <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}} className="justify-evenly">
      <Sidebar id={id} />
      {/* <div className="basis-1/2 flex flex-col flex-wrap">
      <h1>Dashboard hello is here</h1>
      </div> */}
      {selectedConversation && <OpenConversation/>}
    </div>
    </>
  );
};
export default Dashboard;
