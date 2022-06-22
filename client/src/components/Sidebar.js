import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import AddContact from "./AddContact";
import Contacts from "./Contacts";
import Conversions from "./Conversations";
import YourID from "./YourID";
import img_conversation from "./chat.png";
import img_contact from "./man.png";

const Sidebar = ({ id }) => {
  return (
    <div className=" border-2 border-gray-300 basis-4/12"  style={{display:"flex",flexDirection:"column",flexWrap:"wrap"}}>
      <div>
      <Tabs ActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="Conversations" title="conversations">
        <div className="flex flex-wrap justify-center"><div className="text-center"><img src={img_conversation} alt="" width="150px" height="150px" /></div></div>
          <Conversions />
        </Tab>
        <Tab eventKey="contacts" title="contacts">
        <div className="flex flex-wrap justify-center"><div className="text-center"><img src={img_contact} alt="" width="150px" height="150px" /></div></div>
          <Contacts />
        </Tab>
      </Tabs>
      </div>
      <YourID id={id} />
    </div>
  );
};
export default Sidebar;
