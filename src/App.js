import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState, useEffect } from "react";
import ChatWindow from "./components/ChatWindow";
import Login from "./components/Login";
import Register from "./components/Register";
import NavbarComponent from "./components/NavbarComponent";


import NotFound from "./components/NotFound";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import {
//   collection,
//   doc,
//   onSnapshot,
// } from "firebase/firestore";
import { addUser, getUser, getAllUsers, startChat, sendMessage, database } from "./firestore";


function App() {
  // const [app_user, setApp_user] = useState({name: "Shyam", email: "abc@gmail.com", password: "123"});
  const [app_user, setApp_user] = useState();
  const [all_messages, setAll_messages] = useState([]);

  function logoutUser() {
    setApp_user(undefined);
    localStorage.clear();
  }

  useEffect(() => {
    if (app_user !== undefined)
      localStorage.setItem("app_user", JSON.stringify(app_user));
  }, [app_user]);

  useEffect(() => {
    const user = localStorage.getItem("app_user");
    if (user !== "undefined") setApp_user(JSON.parse(user));
  }, []);

  const login_register = (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to='login' />
          }
        />
        <Route
          path="login"
          element={
            <Login
              app_user={app_user}
              getUser={getUser}
              setApp_user={setApp_user}
            />
          }
        />

        <Route path="register" element={<Register addUser={addUser} />} />

        <Route
          path="*"
          element={
            <NotFound />
          }
        />
      </Routes>
    </BrowserRouter>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Navigate to="login" />} />
    //     <Route path="user-list" element={<Navigate to="/login" />} />
    //     <Route
    //       path="login"
    //       element={
    //         <Login
    //           app_user={app_user}
    //           getUser={getUser}
    //           setApp_user={setApp_user}
    //         />
    //       }
    //     />
    //     <Route path="register" element={<Register addUser={addUser} />} />
    //     <Route path="*" element={<NotFound />} />
    //     <Route path="*" element={<Navigate to="login" />} />
    //   </Routes>
    // </BrowserRouter>

    // <Login app_user={app_user} getUser={getUser} setApp_user={setApp_user} />
  );

  return (
    <div className="main_container">
      <NavbarComponent app_user={app_user} logoutUser={logoutUser} />
      <div className="flex_center body_container">
        {/* {console.log(app_user)} */}
        {app_user ? <ChatWindow startChat={startChat} sendMessage={sendMessage} getAllUsers={getAllUsers} app_user={app_user} all_messages={all_messages}/> : login_register}
        {/* <ChatWindow /> */}
        {/* {login_register} */}
      </div>
    </div>
  );
}

export default App;
