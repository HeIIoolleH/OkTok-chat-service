import React, {useEffect, useRef, useState} from 'react';
import { io } from "socket.io-client";
import './ChatRoom.css'


// import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { initializeApp } from "firebase/app";




// import jQuery from 'jquery'


const ChatRoom = (props) => {
    // const firebaseConfig = {
    //     apiKey: "AIzaSyAqCiD3qWXYyz2btOrUnhoO_e-rB6BzUVY",
    //     authDomain: "oktok-5bca4.firebaseapp.com",
    //     projectId: "oktok-5bca4",
    //     storageBucket: "oktok-5bca4.appspot.com",
    //     messagingSenderId: "934421356238",
    //     appId: "1:934421356238:web:a75aa2807fb9608a0bba9f",
    //     measurementId: "G-QGYKCGEB06"
    //   };
      
    // const app = initializeApp(firebaseConfig);

    // const messaging = getMessaging();
    
    
    // onMessage(messaging, (payload) => {
    //     console.log('Message received. ', payload);
    //     // ...
    // });

    const userData = props.userData;
    const userId = props.userId;
    const setIsLogin = props.setIsLogin
    const setEnterChatRoom = props.setEnterChatRoom;
    const roomId = props.roomId;
    const divRef = useRef(null);



    // 각 client에 대한 토큰값 부여 받기


    


    // getToken(messaging, { vapidKey: 'BF04eeBPZxwgIoaIX7Q4U7HoAav-8SQKO848S1xRWAFezrRXFs9GhQE66j2d8AMTZQJP31DyFwRQlJFE3F_eAz8' })
    // .then((currentToken) => {
    //     if (currentToken) {
    //         // Send the token to your server and update the UI if necessary
    //         // ...
    //         // console.log("currentToken :",currentToken);
    //         socket.emit('postToken',(currentToken));
    //     } else {
    //         // Show permission request UI
    //         console.log('No registration token available. Request permission to generate one.');
    //         // ...
    //     }
    // }).catch((err) => {
    //     console.log('An error occurred while retrieving token. ', err);
    //     // ...
    // });



    
    const socket = io.connect(`http://192.168.0.14:8001/room${roomId}`,
        {transports : ['websocket']},
        {path: '/socket.io'}
    );
    
    const [msgData, setMsgData] = useState([]);
    
    socket.on('connection',()=> {
        console.log("connection server");     
    })


    

    
    
    // socket 접속시 joinRoom으로 접속하여 chatdata 받기
    const takeDataSocket = () =>{
        socket.on('joinRoom', function(data){
            setMsgData(data);
        });
    }

    useEffect(() => {
        takeDataSocket();
        if(msgData.length !== 0){
            socket.off('joinRoom')
        }
    },[])
    
    
    // useEffect(()=>{

    // },[])
    


    //채팅 보내기 버튼 구현
    const [chatInput, setChatInput] = useState('')
    const handleChange = (e) => {
        setChatInput(e.target.value); // input의 다음 바뀔 값
    }
    
    // 인풋(chatMsg) 데이터 생성 및 소켓으로 보내기 
    const handleCreate = async() => {         //인풋받은 텍스트와 다른 정보들을 하나의 오브젝트로 저장
        const initialMsg = {
            msg: chatInput,
            user_id: userId,
            roomNum: roomId
        };

        // setChatData(prevstate => prevstate.concat(initialMsg));
        socket.emit('chatMessage', initialMsg);
        await setChatInput('');
        
        await socket.on('chatMessage', function(data){
            if(data !== msgData){
                setMsgData(prevstate => prevstate.concat(data));
            }
            else {
                return;
            }
        })


        divRef.current.scrollTo({
            top: divRef.current.scrollHeight,
            behavior:'smooth',
        });

        
     

        const userName =  findUserName(initialMsg);
        const pushMsg = {
            'notification': {
                'body': initialMsg.msg,
                'title': userName,
                }
        };

        
        socket.emit('pushMsg', pushMsg);
        
        


        // const serverKey = 'BF04eeBPZxwgIoaIX7Q4U7HoAav-8SQKO848S1xRWAFezrRXFs9GhQE66j2d8AMTZQJP31DyFwRQlJFE3F_eAz8'
        
        // await axios.post('https://fcm.googleapis.com/v1/projects/934421356238/messages:send',pushMsg, {
        //     headers :{
        //         'Content-Type': 'application/json',
        //         'Authorization': 'key='+ serverKey
        //     }
        // });


    };
  
    const handleKeyPress = (e) => {
      // 눌려진 키가 enter면 handleCreate 호출
      if(e.key === 'Enter') {
        handleCreate();
      }
    };

    

    // 소켓 연결 끊기
    const disconnetSocket = () => {
        socket.emit('forceDisconnect');
    };
    
    // 유저이름 찾기
    const findUserName = (chatData) =>{
        const userName = userData?.find(user => Number(user.user_id) === Number(chatData.user_id))?.user;
        return userName
    }
    
    // ChatRoomList로 돌아가는 함수
    const retunList = () => {
        setIsLogin(true);
        setEnterChatRoom(0);
    }

    return(
        <div>
            <h1 className='title'>
                OkTok Room{roomId}
            </h1>
            <body className='chatroom'>
                <div className="chat-room-wrapper" ref={divRef}>
                    {msgData.map((li,index)=>{
                        return (
                            <div className="chat-content">
                                {parseInt(li.user_id) === userId ?
                                    <div className='my-chat-wrapper'>
                                        <div className='chat-name'>
                                        {findUserName(li)}
                                        </div>
                                        <div className='my-chat-box'>
                                            {li.msg}
                                        </div>
                                    </div>
                                    :                
                                    <div className='other-chat-wrapper'>
                                        <div className='chat-name'>
                                        {findUserName(li)}
                                        </div>
                                        <div className="other-chat-box">
                                            {li.msg}
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    })}
                </div>
            </body>
            <div className="bottom">
                <input className='input-box' value={chatInput} onKeyPress={handleKeyPress} onChange={handleChange}/>
                <div className='button' onClick={()=>handleCreate()}>
                    전송
                </div>
                <div className='button' onClick={()=> 
                {disconnetSocket()
                retunList()
                }
                }>
                나가기
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;