import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineSend } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";
import {database, createUniqueId} from '../../firestore'


const UserChatWindow = ({
  app_user,
  chat_with_user,
  setChat_with_user,
  sendMessage,
}) => {
  const [message, setMessage] = useState("");
  const [all_messages, setAll_messages] = useState([]);
  // const [first_render, setFirst_render] = useState(true);

  // startChat(app_user, chat_with_user);

  // if(first_render){
  //   // console.log("In first render");
  //     startGettingMessage();
  //   setFirst_render(false);
  // }

  useEffect(() => {
    document.querySelector(".user_chat_window_main").lastChild?.scrollIntoView(true);
  });

  useEffect(() => {
    // async function startGettingMessage() {
      //   const data = await startChat(app_user, chat_with_user);
    //   console.log("Before data");
    //   console.log(data);
    //   setAll_messages((pre) => {
      //     console.log("In SET");
      //     return data;
    //   });
    //   console.log("After data");
    // }
    // startGettingMessage();
    // console.log("In state");
    const unique_id = createUniqueId(app_user, chat_with_user);
    
    try {
      onSnapshot(
        collection(database, "messages", unique_id, "chat"),
        (chatSnap) => {
          const msgs = [];
          chatSnap.forEach((snap) => msgs.push({...snap.data(), id: snap.id}));
          // console.log(msgs);
          setAll_messages(msgs);
          // msgs.e
          // document.querySelector(".user_chat_window_main").lastChild?.scrollIntoView(true);
        }
        );
    } catch (e) {
      console.error("Error adding user: ", e);
    }
  }, [app_user, chat_with_user]);

  function sendMessageToDatabase() {
    if (message === "") return;
    // console.log(message);
    sendMessage(app_user, chat_with_user, message);
    setMessage("");
  }

  function sendIfEnter(event) {
    if (event.code === "Enter") sendMessageToDatabase();
  }

  function goBack() {
    setChat_with_user(undefined);
  }

  return (
    <div className="user_chat_window_container">
      <div className="user_chat_window_top">
        <div className="user_chat_window_bar">
          {/* <a href="/user-list"> */}
          <div style={{ cursor: "pointer" }}>
            <BiArrowBack onClick={goBack} size={25} />
          </div>
          {/* </a> */}
          <BsThreeDotsVertical size={18} />
        </div>

        <div className="user_chat_window_name">
          <h1>{chat_with_user.name}</h1>
        </div>
      </div>
      <hr />
      <div className="user_chat_window_bottom">
        <div className="user_chat_window_main">
          {all_messages.map((msg) => {
            return (
              <div key={msg.id} className="msg_container" style={{display: "flex", justifyContent: msg.sender === app_user.unique ? "flex-end" : "flex-start"}}>
                <div className="msg_box">
                  {msg.message}
                </div>
              </div>
            );
          })}
        </div>
        <hr />
        <div className="user_chat_window_input">
          <input
            onKeyDown={sendIfEnter}
            placeholder="Type your message."
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <AiOutlineSend
            style={{ cursor: "pointer" }}
            onClick={() => sendMessageToDatabase()}
            size={22}
          />
        </div>
      </div>
    </div>
  );
};

export default UserChatWindow;
