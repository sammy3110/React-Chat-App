import React, { useState } from "react";
import UserChatWindow from "./user_components/UserChatWindow";
import UsersList from "./user_components/UsersList";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./NotFound";

const ChatWindow = ({ app_user, getAllUsers, startChat, sendMessage, all_messages }) => {
  const [chat_with_user, setChat_with_user] = useState();

  return (
    <div className=" flex_center chat_window_container">
      {/* <BrowserRouter>
          <Routes>
          <Route path="login" element={ <Navigate to="/user-list" /> } />
              <Route path="user-list" element={<UsersList getAllUsers={getAllUsers} />} />
              <Route path="user-chat-window" element={<UserChatWindow />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter> */}
      {chat_with_user ? (
        <UserChatWindow
          sendMessage={sendMessage}
          startChat={startChat}
          app_user={app_user}
          chat_with_user={chat_with_user}
          setChat_with_user={setChat_with_user}
          all_messages={all_messages}
        />
      ) : (
        <UsersList
          app_user={app_user}
          getAllUsers={getAllUsers}
          setChat_with_user={setChat_with_user}
        />
      )}
      {/* <UsersList/> */}
      {/* <UserChatWindow/> */}
    </div>
  );
};

export default ChatWindow;
