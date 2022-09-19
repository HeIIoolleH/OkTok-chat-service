import React, {useEffect, useRef, useState} from 'react';
import { io } from "socket.io-client";
import './ChatRoom.scss';
import Modal from '../Modals/UserListModal';
import { getMessaging, getToken, onMessage } from "firebase/messaging";



const ChatRoom = (props) => {

    const { userDatas, userId, setIsLogin, setEnterChatRoom, roomId, messaging} = props
    const divRef = useRef(null);
    // const [userId, setUserId] = useState(null);
    const [userIdList, setUserIdList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [userList, setUserList] = useState([]);
    const [token, setToken] = useState('');


    
    const getUserList = (userIdList) => {
        setUserList([])
        userIdList.map( userId =>
            setUserList(prevstate => prevstate.concat(userDatas?.find(user => Number(user.user_id) === Number(userId))?.user))
            )
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };


    
    const socket = io.connect(`http://192.168.0.14:8001/room${roomId}`,
    {transports : ['websocket']},
    {path: '/socket.io'}
    );
    
    const [msgData, setMsgData] = useState([]);
    


    // 각 client에 대한 토큰값 부여 받기
    getToken(messaging, { vapidKey: 'BF04eeBPZxwgIoaIX7Q4U7HoAav-8SQKO848S1xRWAFezrRXFs9GhQE66j2d8AMTZQJP31DyFwRQlJFE3F_eAz8' })
    .then(async(currentToken) => {
        if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // ...
            // console.log("currentToken :",currentToken);
            await setToken(currentToken);
            // console.log("token :",token);
            socket.emit('postToken',(token));
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
    });
    



    // userId 보내기
    const sendUserId = () =>{
        socket.emit('userId',userId); 
    };

    useEffect(()=>{
        setTimeout(() => {
            sendUserId();
        }, 500)
    },[])


    
    // userId 받기
    const getUserIdList = () =>{
        socket.on('userIdList', function(userIdList){
            setUserIdList(userIdList);
            getUserList(userIdList)
        })
    };
    
    useEffect(() => {
        getUserIdList()
    },[]);
    





    // socket 접속시 joinRoom으로 접속하여 chatdata 받기
    const takeDataSocket = () =>{
        socket.on('joinRoom', function(chatData){
            setMsgData(chatData);
        });
    };

    useEffect(() => {
        takeDataSocket();
        if(msgData.length !== 0){
            socket.off('joinRoom');
        }
    },[]);
    

    


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
                socket.off('chatMessage');
            }
            else {
                return;
            }
        })

        const userName =  findMsgUserName(initialMsg);
        const pushMsg = {
            'notification': {
                'body': initialMsg.msg,
                'title': userName,
                }
        };

        socket.emit('pushMsg', pushMsg);
    };
    
    const handleKeyPress = (e) => {
      // 눌려진 키가 enter면 handleCreate 호출
      if(e.key === 'Enter') {
        handleCreate();
      }
    };

    useEffect(() => {
        divRef.current.scrollTo({
            top: divRef.current.scrollHeight,
            behavior:'smooth',
        });
    },[msgData])

    

    // 소켓 연결 끊기
    const disconnetSocket = async() => {
        await socket.emit('forceDisconnect',userId);
    };
    
    // 유저이름 찾기
    const findMsgUserName = (chatData) =>{
        const userName = userDatas?.find(user => Number(user.user_id) === Number(chatData.user_id))?.user;
        return userName
    }
    
    // const findUserNameInRoom = (userId) => {
    //     const userName = userDatas?.find(user => Number(user.user_id) === Number(userId))?.user;
    //     return userName
    // }

    // ChatRoomList로 돌아가는 함수
    const returnList = () => {
        setIsLogin(true);
        setEnterChatRoom(0);
    }

    return(
        <div>
            <div className='title'>
                <div className='roomTitle'>
                    OkTok Room{roomId}
                </div>
                {/* <div className='chat-name'>
                    {findUserNameInRoom(userId)}님
                </div> */}
                <div className='userListModal' onClick={()=>{
                    // sendUserId();
                    openModal();
                    }}>
                    =
                </div>
                <Modal open={modalOpen} close={closeModal} header="Modal heading" 
                roomId={roomId} 
                userList={userList} 
                returnList={returnList} 
                disconnetSocket ={disconnetSocket}></Modal>
            </div>
            <body className='chatroom'>
                <div className="chat-room-wrapper" ref={divRef}>
                    {msgData.map((li,index)=>{
                        return (
                            <div className="chat-content">
                                {parseInt(li.user_id) === userId ?
                                    <div className='my-chat-wrapper'>
                                        <div className='my-chat-box'>
                                            {li.msg}
                                        </div>
                                    </div>
                                    :                
                                    <div className='other-chat-wrapper'>
                                        <div className='other-chat-name'>
                                        {findMsgUserName(li)}
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
                <input className='msg-input-box' value={chatInput} onKeyPress={handleKeyPress} onChange={handleChange}/>
                <div className='send-msg-button' onClick={()=>handleCreate()}>
                    전송
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;