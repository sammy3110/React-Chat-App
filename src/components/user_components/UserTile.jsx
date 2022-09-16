import React from 'react';

const UserTile = ({other_user, setChat_with_user, app_user}) => {
    function gotoChatRoom() {
        // console.log("Goto chat room.");
        // console.log(other_user);
        setChat_with_user(other_user);

    }

  return (
    <div onClick={gotoChatRoom} className='tile_container'>
        <div className="tile_profile">
            <img src="/cloud.jpg" alt="profile pic" />
        </div>
        <div className="tile_chat_info">
            <div className="tile_chat_info_top">
                <h5>{other_user.name}</h5>
                <p>25 June</p>
            </div>
            <div className="tile_chat_info_bottom">
                <p>Sure, Thanks. I am also fine and you too do the same okay bye.</p>
                <p className="pending_message">3</p>
            </div>
        </div>
    </div>
  )
}

export default UserTile