import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import UserTile from "./UserTile";
import Spinner from "react-bootstrap/Spinner";

const UsersList = ({ app_user, getAllUsers, setChat_with_user }) => {
  const [all_users, setAll_Users] = useState([]);
  const [loading_users_spinner, setLoading_users_spinner] = useState(true);

  async function getUsers() {
    const abc = await getAllUsers();
    setAll_Users(abc);
    setLoading_users_spinner(false);
  }

  if (!all_users.length) getUsers();

  return (
    <div className="users_list_container">
      <div className="user_list_title">
        <div>
          Chats{" "}
          {loading_users_spinner ? (
            <Spinner size="md" animation="grow" />
          ) : (
            <></>
          )}{" "}
        </div>
        <FiSearch size={20} />
      </div>

      <div className="user_list_tiles_container">
        <p>{all_users.length - 1} Chat(s)</p>
        <div className="user_list_tiles">
          {all_users.map((user) => {
            if(user.email !== app_user.email)
            return (
              <UserTile
                key={user.email}
                other_user={user}
                app_user={app_user}
                setChat_with_user={setChat_with_user}
              />
            );
            return <></>
          })}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
