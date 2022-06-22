import React, { useCallback, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  FormControl,
  Container,
} from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

const OpenConversation = ({ id }) => {
  const [text, setText] = useState("");
  const { sendMessage, selectedConversation } = useConversations();
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  const handleSend = (e) => {
    e.preventDefault();
    console.log("message", text);
    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    setText("");
  };

  return (
    <>
      <div
        className="border-2 border-gray-200 justify-end basis-5/12"
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
        }}
      >
        <div className="text-3xl font-bold">Messages</div>
        <div className="flex-col flex-wrap max-h-80  overflow-auto">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;
            return (
              <div
                key={index}
                className={`flex-col flex-wrap border-2 border-gray-200 rounded-lg pl-7 pr-7`}
                ref={lastMessage ? setRef : null}
              >
                <div className="flex-col">
                  <div
                    className={`text-lg text-${
                      message.fromMe ? "right" : "left"
                    } `}
                  >
                    <div
                      style={{width:"30vw",wordWrap:"break-word"}}
                    >
                      <span  className={`border-2 border-${
                        message.fromMe ? "green" : "sky"
                      }-100 p-1 rounded-lg bg-${
                        message.fromMe ? "green" : "sky"
                      }-100 text-lg`}>{message.text}</span>
                    </div>
                  </div>
                  <div className={`text-xs font-medium text-${
                      message.fromMe ? "right" : "left"
                    }`}>
                    {message.fromMe ? "you" : message.senderName}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mb-4 p-2">
          <Form onSubmit={(e) => handleSend(e)}>
            <InputGroup>
              <FormControl
                placeholder="Enter your message"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button variant="primary" className="text-2xl bg-sky-500" type="submit">
                Send Message
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </>
  );
};
export default OpenConversation;
