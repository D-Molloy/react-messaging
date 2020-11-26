import React, { useState, useRef, useEffect } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

export default function OpenConversation() {
  const [text, setText] = useState("");
  const { sendMessage, selectedConversation } = useConversations();

  // focus on the new message when enough messages to scroll
  const lastMessageRef = useRef()
  const inputRef = useRef()

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ smooth: true })
    }
    inputRef.current.focus()
  }, [lastMessageRef.current])
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    setText("");
    inputRef.current.focus()
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage = selectedConversation.messages.length - 1 === index
            return (
              <div
                ref={lastMessage ? lastMessageRef : null}
                key={index} className={`my-1 d-flex flex-column ${message.fromMe ? "align-self-end" : "border"
                  }`}>
                <div
                  className={`rounded px-3 py-2 ${message.fromMe ? "bg-primary text-white" : "border"
                    }`}
                >
                  {message.text}
                </div>
                <div className={`text-muted small ${message.fromMe ? "text-right" : ""}`}>{message.fromMe ? "You" : message.senderName}</div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              ref={inputRef}
              as="textarea"
              required
              value={text}
              placeholder="Enter a message..."
              onChange={(e) => setText(e.target.value)}
              style={{ height: 75, resize: "none" }}
            />
            <InputGroup.Append>
              <Button type="submit">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
