import React from 'react';
import './ChatRoomList.scss'
// import { getMessaging, onMessage } from "firebase/messaging";




const ChatRoomList = (props) => {
  
  // const messaging = getMessaging();
  
  
  // onMessage(messaging, (payload) => {
  //   console.log('Message received. ', payload);
  //   // ...
  // });
  


  const setEnterChatRoom = props.setEnterChatRoom;


  const putChatRoomNum = (chattingRoomNumber) => {
    setEnterChatRoom(chattingRoomNumber);
  };
  

  return (
    <div id='ChatRoomList'>
      <div className='chat-room-button' onClick={()=>putChatRoomNum(1)}>
        1번 채팅방
      </div>
      <div className='chat-room-button' onClick={()=>putChatRoomNum(2)}>
        2번 채팅방
      </div>
      <div className='chat-room-button' onClick={()=>putChatRoomNum(3)}>
        3번 채팅방
      </div>
    </div>
  )
};


export default ChatRoomList