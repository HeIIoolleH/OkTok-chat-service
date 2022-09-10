import React, {useState} from 'react';
import './App.scss';
import ChatRoom from './component/ChatRoom/ChatRoom';
import ChatRoomList from './component/ChatRoomList/ChatRoomList';
import Login from './component/Login/Login';
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage} from "firebase/messaging";



// const firebaseConfig = {
//   apiKey: "AIzaSyAqCiD3qWXYyz2btOrUnhoO_e-rB6BzUVY",
//   authDomain: "oktok-5bca4.firebaseapp.com",
//   projectId: "oktok-5bca4",
//   storageBucket: "oktok-5bca4.appspot.com",
//   messagingSenderId: "934421356238",
//   appId: "1:934421356238:web:a75aa2807fb9608a0bba9f",
//   measurementId: "G-QGYKCGEB06"
// };

// const app = initializeApp(firebaseConfig);




// const messaging = getMessaging(app);



// getToken(messaging, { vapidKey: 'BF04eeBPZxwgIoaIX7Q4U7HoAav-8SQKO848S1xRWAFezrRXFs9GhQE66j2d8AMTZQJP31DyFwRQlJFE3F_eAz8' })
//   .then((currentToken) => {
//     if (currentToken) {
//       // Send the token to your server and update the UI if necessary
//       // ...
//       console.log("currentToken :",currentToken);
//     } else {
//       // Show permission request UI
//       console.log('No registration token available. Request permission to generate one.');
//       // ...
//     }
//   }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//     // ...
//   });
  
//   onMessage(messaging, (payload) => {
//     console.log('Message received. ', payload);

//     // ...
//   });
  
  

  const App = () => {


    const [userData, setUserData] = useState([]);
    const [userId, setUserId] = useState(0);
    const [isLogin, setIsLogin] = useState(false);
    const [enterChatRoom, setEnterChatRoom] = useState(0);
    

  

  return (
    <div className='chatService'>
      <div className='chatContent'>
        <div className='chatServiceTitle'>
          <img className='dragonBallImg' src="https://play-lh.googleusercontent.com/qmkVTTKEO-GfvEMjMl-WEpYWNksq1BKiamPqq18A3qChLdazUHvyiCS1c0f_czDmVw"></img>
          Welcome to OkTok
          <img className='dragonBallImg' src="https://play-lh.googleusercontent.com/qmkVTTKEO-GfvEMjMl-WEpYWNksq1BKiamPqq18A3qChLdazUHvyiCS1c0f_czDmVw"></img>
        </div>
        <div>
        {
          isLogin ?
          <div id = 'ChatRoomList'>
          {
            (enterChatRoom === 1 || enterChatRoom === 2 || enterChatRoom === 3) ?
            <ChatRoom
            userData={userData}
            userId={userId} 
            roomId={enterChatRoom} 
            setIsLogin={setIsLogin}
            setEnterChatRoom={setEnterChatRoom}>
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
          userData={userData}
          setUserData={setUserData}
          setUserId={setUserId}
          setIsLogin={setIsLogin}>
          </Login>
        }
        </div>
      </div>
    </div>
  );
}

export default App;
