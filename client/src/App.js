import React, {useState} from 'react';
import './App.scss';
import ChatRoom from './component/ChatRoom/ChatRoom';
import ChatRoomList from './component/ChatRoomList/ChatRoomList';
import Login from './component/Login/Login';

import { getMessaging, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import Toast from 'react-bootstrap/Toast';
// import 'bootstrap/dist/css/bootstrap.min.css';




const firebaseConfig = {
    apiKey: "AIzaSyAqCiD3qWXYyz2btOrUnhoO_e-rB6BzUVY",
    authDomain: "oktok-5bca4.firebaseapp.com",
    projectId: "oktok-5bca4",
    storageBucket: "oktok-5bca4.appspot.com",
    messagingSenderId: "934421356238",
    appId: "1:934421356238:web:a75aa2807fb9608a0bba9f",
    measurementId: "G-QGYKCGEB06"
  };
  
initializeApp(firebaseConfig);

const messaging = getMessaging();

Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    console.log('Notification permission granted.');}})


    
    
const App = () => {
  
  const [userDatas, setUserDatas] = useState([]);
  const [userId, setUserId] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [enterChatRoom, setEnterChatRoom] = useState(0);
  const [pushMsg, setPushMsg] = useState({});
  const [showMessage, setShowMessage] =useState(false);
  
  

  const findMsgUserId = (userName) =>{
    const pushMsgUserId = userDatas?.find(user => user.user === userName)?.user_id;
    console.log(pushMsgUserId);
    return pushMsgUserId;
  }

  const onMessageListener = () =>
    new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        if(findMsgUserId(payload.notification.title) !== userId){

          resolve(payload);
          setPushMsg(payload.notification);
          setShowMessage(true);
        }
      });
  });
  
  const closeMessage = () => {
    setShowMessage(false);
  };

  onMessageListener();


  

  return (
    <div className='chatService'>
      <div className='chatContent'>
        <div className='chatServiceTitle'>
          <img className='dragonBallImg' src="https://play-lh.googleusercontent.com/qmkVTTKEO-GfvEMjMl-WEpYWNksq1BKiamPqq18A3qChLdazUHvyiCS1c0f_czDmVw"></img>
            OkTok
          <img className='dragonBallImg' src="https://play-lh.googleusercontent.com/qmkVTTKEO-GfvEMjMl-WEpYWNksq1BKiamPqq18A3qChLdazUHvyiCS1c0f_czDmVw"></img>
        </div>
        <div>
        {
          isLogin ?
          <div id = 'ChatRoomList'>
          {
            (enterChatRoom === 1 || enterChatRoom === 2 || enterChatRoom === 3) ?
            <ChatRoom
            userDatas={userDatas}
            userId={userId} 
            roomId={enterChatRoom} 
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            setEnterChatRoom={setEnterChatRoom}
            messaging={messaging}>
              채팅방
            </ChatRoom>
          :
          <ChatRoomList
          setEnterChatRoom={setEnterChatRoom}>
          </ChatRoomList>
          }
          </div>
          :
          <Login className='chatServiceBody'
          userDatas={userDatas}
          setUserDatas={setUserDatas}
          setUserId={setUserId}
          setIsLogin={setIsLogin}>
          </Login>
        }
        </div>
      </div>
      <div>
        <Toast className='notification-msg'
          show={showMessage} onClose={closeMessage} delay={300}>
          <Toast.Header className="notification-msg-title">
            <img className="notification-image" alt="" src="https://play-lh.googleusercontent.com/qmkVTTKEO-GfvEMjMl-WEpYWNksq1BKiamPqq18A3qChLdazUHvyiCS1c0f_czDmVw"/>
            <strong> {pushMsg.title} </strong>
          </Toast.Header>
          <Toast.Body className='notification-msg-content'>
            {pushMsg.body}
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
}

export default App;